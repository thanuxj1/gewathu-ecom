import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminHeroSlidesRouter = Router();
adminHeroSlidesRouter.use(requireAdmin);

const slideSchema = z.object({
  eyebrow: z.string().min(1),
  titleWhite: z.string().min(1),
  titleAccent: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.string().optional(),
  primaryLabel: z.string().min(1),
  primaryHref: z.string().min(1),
  secondaryLabel: z.string().min(1),
  secondaryHref: z.string().min(1),
  active: z.boolean().optional(),
});

adminHeroSlidesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    res.json(slides);
  })
);

adminHeroSlidesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = slideSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid slide" });
    }
    const maxOrder = await prisma.heroSlide.aggregate({ _max: { order: true } });
    const slide = await prisma.heroSlide.create({
      data: { ...parsed.data, order: (maxOrder._max.order ?? -1) + 1 },
    });
    res.status(201).json(slide);
  })
);

adminHeroSlidesRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = slideSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid slide" });
    }
    try {
      const slide = await prisma.heroSlide.update({ where: { id: req.params.id }, data: parsed.data });
      res.json(slide);
    } catch {
      res.status(404).json({ error: "Slide not found" });
    }
  })
);

adminHeroSlidesRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.heroSlide.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(404).json({ error: "Slide not found" });
    }
  })
);

const reorderSchema = z.object({ direction: z.enum(["up", "down"]) });

adminHeroSlidesRouter.patch(
  "/:id/reorder",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = reorderSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid direction" });

    const all = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    const index = all.findIndex((s) => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Slide not found" });

    const swapIndex = parsed.data.direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= all.length) return res.json(all);

    const [a, b] = [all[index], all[swapIndex]];
    await prisma.$transaction([
      prisma.heroSlide.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.heroSlide.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);

    const updated = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    res.json(updated);
  })
);
