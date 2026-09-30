"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/auth/register", { name, email, password });
      router.push("/account/orders");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create your account");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl" style={{ color: "var(--color-primary)" }}>Create an account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Full name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg px-6 py-2.5 text-sm font-extrabold text-white transition disabled:opacity-60"
          style={{ background: "var(--color-primary)" }}
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
