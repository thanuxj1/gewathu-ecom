import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminTrustBadgesRouter = Router();
adminTrustBadgesRouter.use(requireAdmin);

const badgeSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  active: z.boolean().optional(),
});

adminTrustBadgesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const badges = await prisma.trustBadge.findMany({ orderBy: { order: "asc" } });
    res.json(badges);
  })
);

adminTrustBadgesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = badgeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid badge" });
    }
    const maxOrder = await prisma.trustBadge.aggregate({ _max: { order: true } });
    const badge = await prisma.trustBadge.create({
      data: { ...parsed.data, order: (maxOrder._max.order ?? -1) + 1 },
    });
    res.status(201).json(badge);
  })
);

adminTrustBadgesRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = badgeSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid badge" });
    }
    try {
      const badge = await prisma.trustBadge.update({ where: { id: req.params.id }, data: parsed.data });
      res.json(badge);
    } catch {
      res.status(404).json({ error: "Badge not found" });
    }
  })
);

adminTrustBadgesRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.trustBadge.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(404).json({ error: "Badge not found" });
    }
  })
);

const reorderSchema = z.object({ direction: z.enum(["up", "down"]) });

adminTrustBadgesRouter.patch(
  "/:id/reorder",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = reorderSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid direction" });

    const all = await prisma.trustBadge.findMany({ orderBy: { order: "asc" } });
    const index = all.findIndex((b) => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Badge not found" });

    const swapIndex = parsed.data.direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= all.length) return res.json(all);

    const [a, b] = [all[index], all[swapIndex]];
    await prisma.$transaction([
      prisma.trustBadge.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.trustBadge.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);

    const updated = await prisma.trustBadge.findMany({ orderBy: { order: "asc" } });
    res.json(updated);
  })
);
