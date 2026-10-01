"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { slugify } from "@/lib/format";
import type { Category, Product } from "@/lib/types";
import { ImageUpload } from "./ImageUpload";

type Props = {
  categories: Category[];
  product?: Product;
};

export function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [customizingAddress, setCustomizingAddress] = useState(!!product);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    unit: product?.unit ?? "",
    badge: product?.badge ?? "",
    featured: product?.featured ?? false,
    price: product ? (product.priceCents / 100).toString() : "",
    imageUrl: product?.imageUrl ?? "",
    stock: product ? String(product.stock) : "0",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateName(name: string) {
    setForm((f) => ({ ...f, name, slug: customizingAddress ? f.slug : slugify(name) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description || undefined,
      unit: form.unit || undefined,
      badge: form.badge || undefined,
      featured: form.featured,
      priceCents: Math.round(parseFloat(form.price || "0") * 100),
      imageUrl: form.imageUrl || undefined,
      stock: parseInt(form.stock || "0", 10),
      categoryId: form.categoryId,
    };

    try {
      if (product) {
        await api.patch(`/api/admin/products/${product.id}`, payload);
      } else {
        await api.post("/api/admin/products", payload);
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save product");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <Field label="Product name">
        <input required value={form.name} onChange={(e) => updateName(e.target.value)} className="input" />
      </Field>

      {customizingAddress ? (
        <Field label="Web address">
          <input
            required
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            className="input"
          />
        </Field>
      ) : (
        <p className="text-xs text-zinc-500">
          Web address: <span className="font-mono">{form.slug || "…"}</span>{" "}
          <button type="button" onClick={() => setCustomizingAddress(true)} className="font-medium text-primary underline">
            Customize
          </button>
        </p>
      )}

      <Field label="Description">
        <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="input" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Unit / short line">
          <input
            value={form.unit}
            onChange={(e) => update("unit", e.target.value)}
            placeholder="e.g. 5 kg bag"
            className="input"
          />
        </Field>
        <Field label="Badge">
          <input
            value={form.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="e.g. Best seller"
            className="input"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Price (Rs.)">
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Stock">
          <input
            required
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Category">
          <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="input">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <ImageUpload label="Product photo (optional)" value={form.imageUrl} onChange={(url) => update("imageUrl", url)} />

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
        />
        Featured on homepage
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : product ? "Save changes" : "Create product"}
      </button>
    </form>
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
