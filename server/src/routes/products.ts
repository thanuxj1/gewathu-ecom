import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const categorySlug = typeof req.query.category === "string" ? req.query.category : undefined;

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(products);
});

productsRouter.get("/:slug", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});
