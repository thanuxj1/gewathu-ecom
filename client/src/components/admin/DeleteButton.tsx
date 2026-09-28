"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";

export function DeleteButton({ path, confirmLabel }: { path: string; confirmLabel: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (!confirm(confirmLabel)) return;
    setBusy(true);
    try {
      await api.delete(path);
      router.refresh();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Could not delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="text-zinc-400 hover:text-red-600 disabled:opacity-50"
      aria-label="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
}
