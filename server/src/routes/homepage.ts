import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const homepageRouter = Router();

const DEFAULT_SETTINGS_ID = "singleton";

homepageRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const [settings, heroSlides, trustBadges, testimonials, guideCards] = await Promise.all([
      prisma.siteSettings.upsert({
        where: { id: DEFAULT_SETTINGS_ID },
        update: {},
        create: { id: DEFAULT_SETTINGS_ID },
      }),
      prisma.heroSlide.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.trustBadge.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.guideCard.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    ]);

    res.json({ settings, heroSlides, trustBadges, testimonials, guideCards });
  })
);
