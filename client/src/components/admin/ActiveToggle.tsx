"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

export function ActiveToggle({ path, active }: { path: string; active: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    try {
      await api.patch(path, { active: !active });
      router.refresh();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Could not update");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={`rounded-full px-2.5 py-1 text-xs font-semibold transition disabled:opacity-50 ${
        active ? "bg-primary-light text-primary" : "bg-zinc-100 text-zinc-500"
      }`}
    >
      {active ? "Active" : "Hidden"}
    </button>
  );
}
