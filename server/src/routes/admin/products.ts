import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminProductsRouter = Router();
adminProductsRouter.use(requireAdmin);

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  unit: z.string().optional(),
  badge: z.string().optional(),
  featured: z.boolean().optional(),
  priceCents: z.number().int().nonnegative(),
  imageUrl: z.string().optional(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
});

adminProductsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  })
);

adminProductsRouter.get(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  })
);

adminProductsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid product" });
    }
    try {
      const product = await prisma.product.create({ data: parsed.data });
      res.status(201).json(product);
    } catch {
      res.status(400).json({ error: "A product with this slug already exists" });
    }
  })
);

adminProductsRouter.patch(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid product" });
    }
    try {
      const product = await prisma.product.update({
        where: { id: req.params.id },
        data: parsed.data,
      });
      res.json(product);
    } catch {
      res.status(404).json({ error: "Product not found" });
    }
  })
);

adminProductsRouter.delete(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    try {
      await prisma.product.delete({ where: { id: req.params.id } });
      res.json({ ok: true });
    } catch {
      res.status(400).json({ error: "Could not delete this product (it may have existing orders)" });
    }
  })
);
