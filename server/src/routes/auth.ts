import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashPassword, comparePassword } from "../lib/password.js";
import { signSession, SESSION_COOKIE_NAME } from "../lib/jwt.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const authRouter = Router();

const isProd = process.env.NODE_ENV === "production";

// The API (onrender.com) and client (vercel.app) are different sites, so the
// session cookie needs SameSite=None to be sent on cross-site fetch() calls —
// which in turn requires Secure, so this only works over HTTPS. In local dev
// client and server share the "localhost" site, where Lax (non-Secure) is fine.
const cookieOptions = {
  httpOnly: true,
  sameSite: isProd ? ("none" as const) : ("lax" as const),
  secure: isProd,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    }
    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const user = await prisma.user.create({
      data: { name, email, password: await hashPassword(password) },
    });

    const token = signSession({ userId: user.id, role: user.role });
    res.cookie(SESSION_COOKIE_NAME, token, cookieOptions);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  })
);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signSession({ userId: user.id, role: user.role });
    res.cookie(SESSION_COOKIE_NAME, token, cookieOptions);
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  })
);

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, { httpOnly: true, sameSite: cookieOptions.sameSite, secure: cookieOptions.secure });
  res.json({ ok: true });
});

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.session!.userId } });
    if (!user) return res.status(401).json({ error: "Not signed in" });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  })
);
