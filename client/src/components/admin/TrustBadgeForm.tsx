"use client";

import { createElement, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { ICON_NAMES, getIcon } from "@/lib/icon-map";

export function TrustBadgeForm() {
  const router = useRouter();
  const [form, setForm] = useState({ icon: ICON_NAMES[0], title: "", description: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/admin/trust-badges", form);
      setForm({ icon: ICON_NAMES[0], title: "", description: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save badge");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-5 sm:items-end">
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Icon</span>
        <div className="flex items-center gap-2">
          {createElement(getIcon(form.icon), { size: 18, style: { color: "var(--color-add)" } })}
          <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className="input">
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-xs font-medium">Title</span>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="input"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-xs font-medium">Description</span>
        <input
          required
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="input"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 sm:col-span-5"
      >
        {submitting ? "Adding…" : "Add trust badge"}
      </button>
      {error && <p className="sm:col-span-5 text-sm text-red-600">{error}</p>}
    </form>
  );
}
