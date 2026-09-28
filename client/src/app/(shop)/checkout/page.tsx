"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { api, ApiError } from "@/lib/api";
import type { Order } from "@/lib/types";

export default function CheckoutPage() {
  const { lines, subtotalCents, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    notes: "",
    paymentMethod: "COD" as "COD" | "BANK_TRANSFER",
  });

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl" style={{ color: "var(--color-primary)" }}>Your cart is empty</h1>
        <Link href="/shop" className="mt-4 inline-block text-primary underline">
          Browse the shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const order = await api.post<Order>("/api/orders", {
        ...form,
        items: lines.map((line) => ({ productId: line.productId, quantity: line.quantity })),
      });
      clear();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not place your order. Please try again.");
      setSubmitting(false);
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input
                required
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Phone number">
              <input
                required
                value={form.customerPhone}
                onChange={(e) => update("customerPhone", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Email address">
            <input
              type="email"
              required
              value={form.customerEmail}
              onChange={(e) => update("customerEmail", e.target.value)}
              className="input"
            />
          </Field>

          <Field label="Delivery address">
            <textarea
              required
              rows={3}
              value={form.shippingAddress}
              onChange={(e) => update("shippingAddress", e.target.value)}
              className="input"
            />
          </Field>

          <Field label="City">
            <input required value={form.city} onChange={(e) => update("city", e.target.value)} className="input" />
          </Field>

          <Field label="Order notes (optional)">
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="input"
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">Payment method</legend>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-black/[.1] p-3 text-sm">
                <input
                  type="radio"
                  checked={form.paymentMethod === "COD"}
                  onChange={() => update("paymentMethod", "COD")}
                />
                Cash on delivery
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-black/[.1] p-3 text-sm">
                <input
                  type="radio"
                  checked={form.paymentMethod === "BANK_TRANSFER"}
                  onChange={() => update("paymentMethod", "BANK_TRANSFER")}
                />
                Bank transfer (details sent by email)
              </label>
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg px-8 py-3 text-sm font-extrabold text-white transition disabled:opacity-60"
            style={{ background: "var(--color-primary)" }}
          >
            {submitting ? "Placing order…" : `Place order — ${formatPrice(subtotalCents)}`}
          </button>
        </form>

        <div className="h-fit rounded-xl border border-black/[.06] p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {lines.map((line) => (
              <div key={line.productId} className="flex justify-between text-sm">
                <span className="text-zinc-600">
                  {line.name} × {line.quantity}
                </span>
                <span className="font-medium">{formatPrice(line.priceCents * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-black/[.06] pt-4 text-sm font-bold">
            <span>Total</span>
            <span>{formatPrice(subtotalCents)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
