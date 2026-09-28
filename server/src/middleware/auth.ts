import type { NextFunction, Request, Response } from "express";
import { SESSION_COOKIE_NAME, verifySession } from "../lib/jwt.js";

declare global {
  namespace Express {
    interface Request {
      session?: { userId: string; role: "CUSTOMER" | "ADMIN" };
    }
  }
}

export function attachSession(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (token) {
    const payload = verifySession(token);
    if (payload) req.session = payload;
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session) {
    return res.status(401).json({ error: "Sign in required" });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session || req.session.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
