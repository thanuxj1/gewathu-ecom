"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteButton({ path, confirmLabel }: { path: string; confirmLabel: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setBusy(true);
    setError(null);
    try {
      await api.delete(path);
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-zinc-400 hover:text-red-600"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmDialog
        open={open}
        title="Delete this?"
        message={confirmLabel}
        error={error}
        busy={busy}
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
          setError(null);
        }}
      />
    </>
  );
}
