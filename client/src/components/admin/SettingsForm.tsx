"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState({
    deliveryBannerText: settings.deliveryBannerText,
    footerTagline: settings.footerTagline,
    whatsappNumber: settings.whatsappNumber,
    whatsappLink: settings.whatsappLink,
    contactEmail: settings.contactEmail,
    contactLocation: settings.contactLocation,
    seasonalEyebrow: settings.seasonalEyebrow,
    seasonalTitle: settings.seasonalTitle,
    seasonalBody: settings.seasonalBody,
    seasonalCtaLabel: settings.seasonalCtaLabel,
    starterEyebrow: settings.starterEyebrow,
    starterTitle: settings.starterTitle,
    starterBody: settings.starterBody,
    starterBadge: settings.starterBadge,
    starterCtaLabel: settings.starterCtaLabel,
    newsletterEyebrow: settings.newsletterEyebrow,
    newsletterTitle: settings.newsletterTitle,
    newsletterBody: settings.newsletterBody,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.patch("/api/admin/settings", form);
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save settings");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <Section title="Announcement Bar">
        <Field label="Delivery banner text" full>
          <input
            required
            value={form.deliveryBannerText}
            onChange={(e) => update("deliveryBannerText", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      <Section title="Footer & Contact">
        <Field label="Footer tagline" full>
          <textarea
            required
            rows={2}
            value={form.footerTagline}
            onChange={(e) => update("footerTagline", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="WhatsApp number">
          <input
            required
            value={form.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="WhatsApp link">
          <input
            required
            value={form.whatsappLink}
            onChange={(e) => update("whatsappLink", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Contact email">
          <input
            required
            value={form.contactEmail}
            onChange={(e) => update("contactEmail", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Contact location">
          <input
            required
            value={form.contactLocation}
            onChange={(e) => update("contactLocation", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      <Section title="Seasonal Banner">
        <Field label="Eyebrow">
          <input
            required
            value={form.seasonalEyebrow}
            onChange={(e) => update("seasonalEyebrow", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="CTA label">
          <input
            required
            value={form.seasonalCtaLabel}
            onChange={(e) => update("seasonalCtaLabel", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Title" full>
          <input
            required
            value={form.seasonalTitle}
            onChange={(e) => update("seasonalTitle", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Body" full>
          <textarea
            required
            rows={2}
            value={form.seasonalBody}
            onChange={(e) => update("seasonalBody", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      <Section title="Starter Kit Banner">
        <Field label="Eyebrow">
          <input
            required
            value={form.starterEyebrow}
            onChange={(e) => update("starterEyebrow", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Badge text">
          <input
            required
            value={form.starterBadge}
            onChange={(e) => update("starterBadge", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Title" full>
          <input
            required
            value={form.starterTitle}
            onChange={(e) => update("starterTitle", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Body" full>
          <textarea
            required
            rows={2}
            value={form.starterBody}
            onChange={(e) => update("starterBody", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="CTA label">
          <input
            required
            value={form.starterCtaLabel}
            onChange={(e) => update("starterCtaLabel", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      <Section title="Newsletter">
        <Field label="Eyebrow">
          <input
            required
            value={form.newsletterEyebrow}
            onChange={(e) => update("newsletterEyebrow", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Title" full>
          <input
            required
            value={form.newsletterTitle}
            onChange={(e) => update("newsletterTitle", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Body" full>
          <textarea
            required
            rows={2}
            value={form.newsletterBody}
            onChange={(e) => update("newsletterBody", e.target.value)}
            className="input"
          />
        </Field>
      </Section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-primary">Settings saved.</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/[.06] bg-white p-5">
      <h2 className="font-semibold" style={{ color: "var(--color-primary)" }}>
        {title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
