import { cookies } from "next/headers";
import type { SessionUser } from "./types";

// Server-to-server call — see server-api.ts for why this isn't NEXT_PUBLIC_API_URL.
const API_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

export async function getServerSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  const res = await fetch(`${API_URL}/api/auth/me`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
