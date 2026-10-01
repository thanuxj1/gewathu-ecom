"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { slugify } from "@/lib/format";

export function CategoryForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", icon: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/admin/categories", {
        name: form.name,
        slug: slugify(form.name),
        description: form.description || undefined,
        icon: form.icon || undefined,
      });
      setForm({ name: "", description: "", icon: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save category");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-4 sm:items-end">
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Icon (an emoji)</span>
        <input
          value={form.icon}
          onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
          placeholder="🌿"
          className="input"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Name</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Description</span>
        <input
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="input"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 sm:col-span-1"
      >
        {submitting ? "Adding…" : "Add category"}
      </button>
      {error && <p className="sm:col-span-4 text-sm text-red-600">{error}</p>}
    </form>
  );
}
