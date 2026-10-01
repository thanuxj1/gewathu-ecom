import type { NextConfig } from "next";

// The browser must only ever talk to this app's own origin for anything that
// carries the session cookie — the cookie belongs to the backend's domain
// (gewathu-api.onrender.com), so a request made directly from the browser to
// that domain never gets a chance to attach it when the frontend is a
// different site (client-jet-gamma-32.vercel.app). Proxying /api and
// /uploads here means the cookie is set (and read back) against this app's
// own origin instead, which also sidesteps CORS for these paths entirely.
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` },
      { source: "/uploads/:path*", destination: `${BACKEND_URL}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
