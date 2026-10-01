"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { api, ApiError } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function resolveSrc(value: string) {
  return value.startsWith("/") ? `${API_URL}${value}` : value;
}

export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const result = await api.upload<{ url: string }>("/api/admin/uploads", file);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not upload photo");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1 block text-sm font-medium">{label}</span>

      {value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveSrc(value)}
            alt="Selected"
            className="h-20 w-20 rounded-lg border border-black/[.08] object-cover"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-black/[.1] px-4 py-1.5 text-xs font-semibold hover:bg-zinc-50 disabled:opacity-60"
            >
              Replace photo
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          disabled={uploading}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-sm text-zinc-500 transition disabled:opacity-60 ${
            dragOver ? "border-primary bg-primary-light" : "border-black/[.12] hover:border-primary"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin text-primary" />
              Uploading…
            </>
          ) : (
            <>
              <ImagePlus size={22} />
              <span>
                <span className="font-semibold text-primary">Choose a photo</span> or drag one here
              </span>
              <span className="text-xs text-zinc-400">JPG, PNG, WEBP or GIF — up to 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
