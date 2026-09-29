"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

export function GuideCardForm() {
  const router = useRouter();
  const [form, setForm] = useState({ number: "", title: "", blurb: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/admin/guide-cards", form);
      setForm({ number: "", title: "", blurb: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save guide card");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-6 sm:items-end">
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Number</span>
        <input
          required
          placeholder="01"
          value={form.number}
          onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
          className="input"
        />
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
        <span className="mb-1 block text-xs font-medium">Blurb</span>
        <input
          required
          value={form.blurb}
          onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
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
      {error && <p className="sm:col-span-6 text-sm text-red-600">{error}</p>}
    </form>
  );
}
