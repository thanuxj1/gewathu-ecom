import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminGuideCardsRouter = Router();
adminGuideCardsRouter.use(requireAdmin);

const guideCardSchema = z.object({
  number: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  active: z.boolean().optional(),
});

adminGuideCardsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const cards = await prisma.guideCard.findMany({ orderBy: { order: "asc" } });
    res.json(cards);
  })
);

adminGuideCardsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = guideCardSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid guide card" });
    }
    const maxOrder = await prisma.guideCard.aggregate({ _max: { order: true } });
    const card = await prisma.guideCard.create({
      data: { ...parsed.data, order: (maxOrder._max.order ?? -1) + 1 },
    });
    res.status(201).json(card);
  })
);

adminGuideCardsRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = guideCardSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid guide card" });
    }
    try {
      const card = await prisma.guideCard.update({ where: { id: req.params.id }, data: parsed.data });
      res.json(card);
    } catch {
      res.status(404).json({ error: "Guide card not found" });
    }
  })
);

adminGuideCardsRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.guideCard.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(404).json({ error: "Guide card not found" });
    }
  })
);

const reorderSchema = z.object({ direction: z.enum(["up", "down"]) });

adminGuideCardsRouter.patch(
  "/:id/reorder",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = reorderSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid direction" });

    const all = await prisma.guideCard.findMany({ orderBy: { order: "asc" } });
    const index = all.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Guide card not found" });

    const swapIndex = parsed.data.direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= all.length) return res.json(all);

    const [a, b] = [all[index], all[swapIndex]];
    await prisma.$transaction([
      prisma.guideCard.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.guideCard.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);

    const updated = await prisma.guideCard.findMany({ orderBy: { order: "asc" } });
    res.json(updated);
  })
);
