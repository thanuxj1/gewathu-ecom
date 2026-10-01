// This module is shared by Client Components (browser) and Server Components
// (Node, during SSR) alike, and the two need different base URLs:
//  - In the browser, "" (relative) in production routes through this app's
//    own /api rewrite (see next.config.ts) so the session cookie stays
//    same-origin — a direct cross-site URL here never gets the cookie back.
//  - On the server, there is no browser/cookie jar and no document to resolve
//    a relative URL against (Node's fetch throws on one) — call the real
//    backend directly instead.
function resolveApiUrl(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  }
  return process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === "production" ? "" : "http://localhost:4000");
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${resolveApiUrl()}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: options?.cache ?? "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.error ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

async function upload<T>(path: string, file: File): Promise<T> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${resolveApiUrl()}${path}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.error ?? `Upload failed (${res.status})`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, data?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: "POST", body: data ? JSON.stringify(data) : undefined }),
  patch: <T>(path: string, data?: unknown, options?: RequestInit) =>
    request<T>(path, { ...options, method: "PATCH", body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, { ...options, method: "DELETE" }),
  upload,
};
