"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import type { HeroSlide } from "@/lib/types";

export function HeroSlideForm({ slide }: { slide?: HeroSlide }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    eyebrow: slide?.eyebrow ?? "",
    titleWhite: slide?.titleWhite ?? "",
    titleAccent: slide?.titleAccent ?? "",
    body: slide?.body ?? "",
    imageUrl: slide?.imageUrl ?? "",
    primaryLabel: slide?.primaryLabel ?? "Shop Now",
    primaryHref: slide?.primaryHref ?? "/shop",
    secondaryLabel: slide?.secondaryLabel ?? "Learn gardening",
    secondaryHref: slide?.secondaryHref ?? "/#guide",
    active: slide?.active ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = { ...form, imageUrl: form.imageUrl || undefined };

    try {
      if (slide) {
        await api.patch(`/api/admin/hero-slides/${slide.id}`, payload);
      } else {
        await api.post("/api/admin/hero-slides", payload);
      }
      router.push("/admin/content/hero-slides");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save slide");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <Field label="Eyebrow (small label above heading)">
        <input required value={form.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} className="input" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Heading — white part">
          <input
            required
            value={form.titleWhite}
            onChange={(e) => update("titleWhite", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Heading — accent part">
          <input
            required
            value={form.titleAccent}
            onChange={(e) => update("titleAccent", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <Field label="Body text">
        <textarea required rows={3} value={form.body} onChange={(e) => update("body", e.target.value)} className="input" />
      </Field>

      <Field label="Background image URL (optional — falls back to default photo)">
        <input value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className="input" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary button label">
          <input
            required
            value={form.primaryLabel}
            onChange={(e) => update("primaryLabel", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Primary button link">
          <input
            required
            value={form.primaryHref}
            onChange={(e) => update("primaryHref", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Secondary link label">
          <input
            required
            value={form.secondaryLabel}
            onChange={(e) => update("secondaryLabel", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Secondary link href">
          <input
            required
            value={form.secondaryHref}
            onChange={(e) => update("secondaryHref", e.target.value)}
            className="input"
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} />
        Active (visible on homepage)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : slide ? "Save changes" : "Create slide"}
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
