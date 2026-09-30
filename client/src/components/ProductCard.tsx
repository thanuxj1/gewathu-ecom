"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { getCategoryTheme } from "@/lib/category-theme";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;
  const theme = getCategoryTheme(product.category.slug);

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-[14px] border bg-white transition hover:-translate-y-0.5"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <ProductImage
          imageUrl={product.imageUrl}
          name={product.name}
          categorySlug={product.category.slug}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className="absolute left-2.5 top-2.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-black shadow-sm"
            style={{ color: theme.iconColor }}
          >
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="flex gap-0.5" style={{ color: "var(--color-star)" }} aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-[16.5px] font-normal"
          style={{ color: "var(--color-primary)" }}
        >
          {product.name}
        </Link>
        {product.unit && <p className="text-xs text-zinc-500">{product.unit}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold" style={{ color: "var(--foreground)" }}>
            {formatPrice(product.priceCents)}
          </span>
          <motion.button
            type="button"
            disabled={outOfStock}
            onClick={() => addItem(product)}
            whileHover={outOfStock ? undefined : { scale: 1.05 }}
            whileTap={outOfStock ? undefined : { scale: 0.92 }}
            className="flex items-center gap-1 rounded-[7px] px-3.5 py-2 text-xs font-extrabold text-white transition disabled:cursor-not-allowed disabled:bg-zinc-300"
            style={outOfStock ? undefined : { background: "var(--color-add)" }}
          >
            <Plus size={14} />
            {outOfStock ? "Sold out" : "Add"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
