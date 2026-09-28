"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./types";

export type CartLine = {
  productId: string;
  name: string;
  slug: string;
  priceCents: number;
  imageUrl: string | null;
  categorySlug: string;
  unit: string | null;
  stock: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gewathu_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount — the server always renders
    // an empty cart, so this necessarily happens after the initial render.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable (private mode etc.) — cart just won't persist
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotalCents = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);

    return {
      lines,
      count,
      subtotalCents,
      addItem: (product, quantity = 1) => {
        setLines((prev) => {
          const existing = prev.find((line) => line.productId === product.id);
          if (existing) {
            return prev.map((line) =>
              line.productId === product.id
                ? { ...line, quantity: Math.min(line.quantity + quantity, product.stock) }
                : line
            );
          }
          return [
            ...prev,
            {
              productId: product.id,
              name: product.name,
              slug: product.slug,
              priceCents: product.priceCents,
              imageUrl: product.imageUrl,
              categorySlug: product.category.slug,
              unit: product.unit,
              stock: product.stock,
              quantity: Math.min(quantity, product.stock),
            },
          ];
        });
      },
      updateQuantity: (productId, quantity) => {
        setLines((prev) =>
          quantity <= 0
            ? prev.filter((line) => line.productId !== productId)
            : prev.map((line) => (line.productId === productId ? { ...line, quantity } : line))
        );
      },
      removeItem: (productId) => {
        setLines((prev) => prev.filter((line) => line.productId !== productId));
      },
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
