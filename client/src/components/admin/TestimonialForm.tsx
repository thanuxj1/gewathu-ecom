"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

export function TestimonialForm() {
  const router = useRouter();
  const [form, setForm] = useState({ quote: "", author: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/admin/testimonials", form);
      setForm({ quote: "", author: "" });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save testimonial");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-5 sm:items-end">
      <label className="block sm:col-span-3">
        <span className="mb-1 block text-xs font-medium">Quote</span>
        <input
          required
          value={form.quote}
          onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
          className="input"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-xs font-medium">Author</span>
        <input
          required
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
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
      {error && <p className="sm:col-span-5 text-sm text-red-600">{error}</p>}
    </form>
  );
}
