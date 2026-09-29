"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { api, ApiError } from "@/lib/api";

export function ReorderButtons({
  path,
  disableUp,
  disableDown,
}: {
  path: string;
  disableUp: boolean;
  disableDown: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function move(direction: "up" | "down") {
    setBusy(true);
    try {
      await api.patch(`${path}/reorder`, { direction });
      router.refresh();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Could not reorder");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => move("up")}
        disabled={busy || disableUp}
        aria-label="Move up"
        className="text-zinc-400 hover:text-primary disabled:opacity-30"
      >
        <ChevronUp size={16} />
      </button>
      <button
        type="button"
        onClick={() => move("down")}
        disabled={busy || disableDown}
        aria-label="Move down"
        className="text-zinc-400 hover:text-primary disabled:opacity-30"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
