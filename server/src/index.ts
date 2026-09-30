import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { attachSession } from "./middleware/auth.js";
import { categoriesRouter } from "./routes/categories.js";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import { ordersRouter } from "./routes/orders.js";
import { subscribersRouter } from "./routes/subscribers.js";
import { adminOrdersRouter } from "./routes/admin/orders.js";
import { adminProductsRouter } from "./routes/admin/products.js";
import { adminCategoriesRouter } from "./routes/admin/categories.js";
import { payhereRouter } from "./routes/payhere.js";
import { homepageRouter } from "./routes/homepage.js";
import { adminHeroSlidesRouter } from "./routes/admin/heroSlides.js";
import { adminTrustBadgesRouter } from "./routes/admin/trustBadges.js";
import { adminTestimonialsRouter } from "./routes/admin/testimonials.js";
import { adminGuideCardsRouter } from "./routes/admin/guideCards.js";
import { adminSettingsRouter } from "./routes/admin/settings.js";
import { adminAnalyticsRouter } from "./routes/admin/analytics.js";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(attachSession);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/subscribers", subscribersRouter);
app.use("/api/admin/orders", adminOrdersRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/categories", adminCategoriesRouter);
app.use("/api/payhere", payhereRouter);
app.use("/api/homepage", homepageRouter);
app.use("/api/admin/hero-slides", adminHeroSlidesRouter);
app.use("/api/admin/trust-badges", adminTrustBadgesRouter);
app.use("/api/admin/testimonials", adminTestimonialsRouter);
app.use("/api/admin/guide-cards", adminGuideCardsRouter);
app.use("/api/admin/settings", adminSettingsRouter);
app.use("/api/admin/analytics", adminAnalyticsRouter);

// Catches errors forwarded via next(err) — e.g. from asyncHandler-wrapped
// routes — so a transient failure (like a dropped DB connection) returns a
// JSON 500 instead of crashing the whole process.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (res.headersSent) return;
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

// Last-resort safety net for anything that still slips past asyncHandler
// (e.g. a rejection outside a request/response lifecycle) — log it and keep
// the process (and everyone else's in-flight requests) alive.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
