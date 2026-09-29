import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminSettingsRouter = Router();
adminSettingsRouter.use(requireAdmin);

const DEFAULT_SETTINGS_ID = "singleton";

const settingsSchema = z.object({
  deliveryBannerText: z.string().min(1).optional(),
  logoUrl: z.string().optional(),
  footerTagline: z.string().min(1).optional(),
  whatsappNumber: z.string().min(1).optional(),
  whatsappLink: z.string().min(1).optional(),
  contactEmail: z.string().min(1).optional(),
  contactLocation: z.string().min(1).optional(),
  seasonalEyebrow: z.string().min(1).optional(),
  seasonalTitle: z.string().min(1).optional(),
  seasonalBody: z.string().min(1).optional(),
  seasonalCtaLabel: z.string().min(1).optional(),
  starterEyebrow: z.string().min(1).optional(),
  starterTitle: z.string().min(1).optional(),
  starterBody: z.string().min(1).optional(),
  starterBadge: z.string().min(1).optional(),
  starterCtaLabel: z.string().min(1).optional(),
  newsletterEyebrow: z.string().min(1).optional(),
  newsletterTitle: z.string().min(1).optional(),
  newsletterBody: z.string().min(1).optional(),
});

adminSettingsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const settings = await prisma.siteSettings.upsert({
      where: { id: DEFAULT_SETTINGS_ID },
      update: {},
      create: { id: DEFAULT_SETTINGS_ID },
    });
    res.json(settings);
  })
);

adminSettingsRouter.patch(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = settingsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid settings" });
    }
    const settings = await prisma.siteSettings.upsert({
      where: { id: DEFAULT_SETTINGS_ID },
      update: parsed.data,
      create: { id: DEFAULT_SETTINGS_ID, ...parsed.data },
    });
    res.json(settings);
  })
);
