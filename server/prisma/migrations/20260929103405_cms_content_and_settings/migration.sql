-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "eyebrow" TEXT NOT NULL,
    "titleWhite" TEXT NOT NULL,
    "titleAccent" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "primaryLabel" TEXT NOT NULL,
    "primaryHref" TEXT NOT NULL,
    "secondaryLabel" TEXT NOT NULL,
    "secondaryHref" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrustBadge" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrustBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideCard" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "deliveryBannerText" TEXT NOT NULL DEFAULT 'Free delivery in selected areas for orders above Rs. 5,000',
    "logoUrl" TEXT,
    "footerTagline" TEXT NOT NULL DEFAULT 'Your local online destination for plants, seeds, tools and everything needed to grow at home.',
    "whatsappNumber" TEXT NOT NULL DEFAULT '+94 XX XXX XXXX',
    "whatsappLink" TEXT NOT NULL DEFAULT 'https://wa.me/94',
    "contactEmail" TEXT NOT NULL DEFAULT 'hello@gewathu.lk',
    "contactLocation" TEXT NOT NULL DEFAULT 'Sri Lanka',
    "seasonalEyebrow" TEXT NOT NULL DEFAULT 'Seasonal essentials',
    "seasonalTitle" TEXT NOT NULL DEFAULT 'Ready for the next planting season?',
    "seasonalBody" TEXT NOT NULL DEFAULT 'Choose the right seeds, growing media and tools for a productive home garden.',
    "seasonalCtaLabel" TEXT NOT NULL DEFAULT 'Shop seasonal picks',
    "starterEyebrow" TEXT NOT NULL DEFAULT 'Simple way to begin',
    "starterTitle" TEXT NOT NULL DEFAULT 'Your first home garden, all in one box.',
    "starterBody" TEXT NOT NULL DEFAULT 'A practical starter bundle with seeds, growing media, hand tools and an easy Sinhala/English planting guide.',
    "starterBadge" TEXT NOT NULL DEFAULT 'Beginner friendly',
    "starterCtaLabel" TEXT NOT NULL DEFAULT 'Explore starter kits',
    "newsletterEyebrow" TEXT NOT NULL DEFAULT 'Grow with us',
    "newsletterTitle" TEXT NOT NULL DEFAULT 'Fresh ideas for your garden',
    "newsletterBody" TEXT NOT NULL DEFAULT 'Receive seasonal tips, useful guides and selected offers.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
