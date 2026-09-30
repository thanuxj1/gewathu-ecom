"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        type="button"
        disabled={outOfStock}
        onClick={() => {
          addItem(product, quantity);
          setAdded(true);
        }}
        className="rounded-lg px-6 py-2.5 text-sm font-extrabold text-white transition disabled:cursor-not-allowed disabled:bg-zinc-300"
        style={outOfStock ? undefined : { background: "var(--color-add)" }}
      >
        {outOfStock ? "Sold out" : "Add to cart"}
      </button>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="text-sm font-bold underline"
          style={{ color: "var(--color-primary)" }}
        >
          Added — view cart
        </button>
      )}
    </div>
  );
}
