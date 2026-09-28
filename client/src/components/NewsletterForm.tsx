"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/api/subscribers", { email });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-sm font-medium text-white">Thanks — you&apos;re subscribed!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-zinc-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg px-6 py-2.5 text-sm font-extrabold text-[#222] transition hover:brightness-95 disabled:opacity-60"
        style={{ background: "var(--color-accent)" }}
      >
        {status === "loading" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-red-200">Something went wrong — try again.</p>}
    </form>
  );
}
