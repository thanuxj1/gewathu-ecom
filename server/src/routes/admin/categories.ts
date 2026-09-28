import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminCategoriesRouter = Router();
adminCategoriesRouter.use(requireAdmin);

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
});

adminCategoriesRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid category" });
    }
    try {
      const category = await prisma.category.create({ data: parsed.data });
      res.status(201).json(category);
    } catch {
      res.status(400).json({ error: "A category with this slug already exists" });
    }
  })
);

adminCategoriesRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = categorySchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid category" });
    }
    try {
      const category = await prisma.category.update({
        where: { id: req.params.id },
        data: parsed.data,
      });
      res.json(category);
    } catch {
      res.status(404).json({ error: "Category not found" });
    }
  })
);

adminCategoriesRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.category.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(400).json({ error: "Could not delete this category (it may still have products)" });
    }
  })
);
