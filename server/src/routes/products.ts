import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const productsRouter = Router();

productsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const categorySlug = typeof req.query.category === "string" ? req.query.category : undefined;
    const featured = req.query.featured === "true";
    const search = typeof req.query.q === "string" ? req.query.q : undefined;

    const products = await prisma.product.findMany({
      where: {
        category: categorySlug ? { slug: categorySlug } : undefined,
        featured: featured ? true : undefined,
        name: search ? { contains: search, mode: "insensitive" } : undefined,
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(products);
  })
);

productsRouter.get(
  "/:slug",
  asyncHandler<{ slug: string }>(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  })
);
