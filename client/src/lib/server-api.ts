import { cookies } from "next/headers";

// Server-to-server call — goes straight to the real backend, not through the
// /api rewrite (that rewrite exists for the browser's same-origin requests).
const API_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function serverGet<T>(path: string): Promise<T | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}${path}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
