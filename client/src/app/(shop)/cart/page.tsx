"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";

export default function CartPage() {
  const { lines, subtotalCents, updateQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl" style={{ color: "var(--color-primary)" }}>Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-500">Add some plants, seeds or tools to get started.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-extrabold text-[#222] transition hover:brightness-95"
          style={{ background: "var(--color-accent)" }}
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>Your cart</h1>

      <div className="mt-6 divide-y divide-black/[.06]">
        {lines.map((line) => (
          <div key={line.productId} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <ProductImage
                imageUrl={line.imageUrl}
                name={line.name}
                categorySlug={line.categorySlug}
                className="h-full w-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/products/${line.slug}`} className="line-clamp-1 font-medium hover:text-primary">
                {line.name}
              </Link>
              {line.unit && <p className="text-xs text-zinc-500">{line.unit}</p>}
              <p className="mt-1 text-sm font-semibold text-primary">
                {formatPrice(line.priceCents)}
              </p>
            </div>
            <div className="flex items-center rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
              <button
                type="button"
                onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{line.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(line.productId, Math.min(line.stock, line.quantity + 1))}
                className="flex h-8 w-8 items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(line.productId)}
              className="text-zinc-400 hover:text-red-600"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-sm text-zinc-500">Subtotal</p>
          <p className="text-2xl font-bold">{formatPrice(subtotalCents)}</p>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
