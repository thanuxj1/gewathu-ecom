"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { ICON_NAMES } from "@/lib/icon-map";
import { IconPicker } from "./IconPicker";

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-xs font-medium">Icon</span>
        <IconPicker value={form.icon} onChange={(icon) => setForm((f) => ({ ...f, icon }))} />
      </label>
      <div className="grid gap-3 sm:grid-cols-5 sm:items-end">
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
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60 sm:col-span-1"
        >
          {submitting ? "Adding…" : "Add"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
