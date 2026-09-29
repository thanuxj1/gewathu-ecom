import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminTestimonialsRouter = Router();
adminTestimonialsRouter.use(requireAdmin);

const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  active: z.boolean().optional(),
});

adminTestimonialsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json(testimonials);
  })
);

adminTestimonialsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid testimonial" });
    }
    const maxOrder = await prisma.testimonial.aggregate({ _max: { order: true } });
    const testimonial = await prisma.testimonial.create({
      data: { ...parsed.data, order: (maxOrder._max.order ?? -1) + 1 },
    });
    res.status(201).json(testimonial);
  })
);

adminTestimonialsRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = testimonialSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid testimonial" });
    }
    try {
      const testimonial = await prisma.testimonial.update({ where: { id: req.params.id }, data: parsed.data });
      res.json(testimonial);
    } catch {
      res.status(404).json({ error: "Testimonial not found" });
    }
  })
);

adminTestimonialsRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.testimonial.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(404).json({ error: "Testimonial not found" });
    }
  })
);

const reorderSchema = z.object({ direction: z.enum(["up", "down"]) });

adminTestimonialsRouter.patch(
  "/:id/reorder",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = reorderSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid direction" });

    const all = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    const index = all.findIndex((t) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Testimonial not found" });

    const swapIndex = parsed.data.direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= all.length) return res.json(all);

    const [a, b] = [all[index], all[swapIndex]];
    await prisma.$transaction([
      prisma.testimonial.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.testimonial.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);

    const updated = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json(updated);
  })
);
