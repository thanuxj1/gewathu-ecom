"use client";

import { ICON_NAMES, getIcon } from "@/lib/icon-map";

export function IconPicker({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  return (
    <div className="grid grid-cols-7 gap-2 rounded-lg border border-black/[.1] p-2 sm:grid-cols-13">
      {ICON_NAMES.map((name) => {
        const Icon = getIcon(name);
        const selected = name === value;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            aria-label={name}
            className={`flex h-9 w-9 items-center justify-center rounded-md transition ${
              selected ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
