import type { IconName } from "@/components/ui/Icon";

/**
 * Presentational Home content for Milestone 1.
 * Products and categories here are display copy, not database records.
 * Image fields stay null until client files are added under /images.
 */
export type Tone = "mint" | "lime" | "clay" | "soil" | "sun" | "water";

export type NavHref = "/" | "/shop" | "/guide" | "/about";

export const announcement =
  "Free delivery in selected areas for orders above Rs. 5,000";

export const navigation: { href: NavHref; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/guide", label: "Gardening Guide" },
  { href: "/about", label: "About & Contact" },
];

export const brand = {
  name: "Gewathu.lk",
  logoSrc: "/logo.png" as string | null,
  heroSrc: "/hero-garden.webp" as string | null,
  heroAlt: "A Sri Lankan home gardener tending fresh vegetables",
};

export const hero = {
  eyebrow: "Everything for your garden",
  titleLead: "Grow better.",
  titleAccent: "Live greener.",
  description:
    "Plants, seeds, garden tools and trusted supplies—carefully selected for Sri Lankan homes.",
  searchPlaceholder: "What are you looking for?",
  searchLabel: "Search products",
  searchAction: "Search",
  primaryCta: "Shop Now",
  secondaryCta: "Learn gardening",
};

export const benefits: { title: string; detail: string; icon: IconName }[] = [
  { title: "Local delivery", detail: "Across Sri Lanka", icon: "truck" },
  { title: "Quality checked", detail: "Products you can trust", icon: "badge" },
  { title: "Secure payment", detail: "Safe & convenient", icon: "shield" },
  { title: "Friendly support", detail: "Help when you need it", icon: "headphones" },
];

export const categories: {
  name: string;
  detail: string;
  icon: IconName;
  tone: Tone;
  href: "/shop";
}[] = [
  {
    name: "Plants",
    detail: "Indoor, outdoor & fruit plants",
    icon: "leaf",
    tone: "mint",
    href: "/shop",
  },
  {
    name: "Seeds & Seedlings",
    detail: "Vegetables, herbs & flowers",
    icon: "sprout",
    tone: "lime",
    href: "/shop",
  },
  {
    name: "Pots & Planters",
    detail: "Clay, plastic & grow bags",
    icon: "flower",
    tone: "clay",
    href: "/shop",
  },
  {
    name: "Soil & Fertilizers",
    detail: "Compost, coco peat & nutrition",
    icon: "package",
    tone: "soil",
    href: "/shop",
  },
  {
    name: "Garden Tools",
    detail: "Everything for hands-on gardening",
    icon: "shovel",
    tone: "sun",
    href: "/shop",
  },
  {
    name: "Watering & Irrigation",
    detail: "Hoses, sprinklers & drip kits",
    icon: "droplets",
    tone: "water",
    href: "/shop",
  },
];

export const featuredProducts: {
  id: string;
  name: string;
  detail: string;
  priceRupees: number;
  badge: string;
  icon: IconName;
  tone: Tone;
  imageSrc: string | null;
}[] = [
  {
    id: "organic-vermicompost",
    name: "Organic Vermicompost",
    detail: "5 kg bag",
    priceRupees: 1250,
    badge: "Best seller",
    icon: "package",
    tone: "soil",
    imageSrc: null,
  },
  {
    id: "home-vegetable-seed-pack",
    name: "Home Vegetable Seed Pack",
    detail: "8 popular varieties",
    priceRupees: 890,
    badge: "Starter pick",
    icon: "sprout",
    tone: "lime",
    imageSrc: null,
  },
  {
    id: "garden-tool-set",
    name: "3-Piece Garden Tool Set",
    detail: "Trowel, fork & cultivator",
    priceRupees: 2450,
    badge: "New",
    icon: "shovel",
    tone: "sun",
    imageSrc: null,
  },
  {
    id: "herb-seedling-collection",
    name: "Herb Seedling Collection",
    detail: "6 healthy seedlings",
    priceRupees: 1600,
    badge: "Fresh stock",
    icon: "leaf",
    tone: "mint",
    imageSrc: null,
  },
];

export const seasonal = {
  kicker: "Seasonal essentials",
  title: "Ready for the next planting season?",
  description:
    "Choose the right seeds, growing media and tools for a productive home garden.",
  cta: "Shop seasonal picks",
  href: "/shop" as const,
  cards: [
    {
      title: "Vegetable growing",
      detail: "Seeds, trays and starter media",
      icon: "sprout" as IconName,
    },
    {
      title: "Water wisely",
      detail: "Simple drip and watering solutions",
      icon: "droplets" as IconName,
    },
    {
      title: "Healthy soil",
      detail: "Compost and organic nutrition",
      icon: "leaf" as IconName,
    },
  ],
};

export const starterKit = {
  kicker: "Simple way to begin",
  titleLead: "Your first home garden,",
  titleRest: "all in one box.",
  description:
    "A practical starter bundle with seeds, growing media, hand tools and an easy Sinhala/English planting guide.",
  cta: "Explore starter kits",
  href: "/shop" as const,
  badge: "Beginner friendly",
  icons: ["sprout", "shovel", "droplets"] as IconName[],
};

export const guidePreview = {
  eyebrow: "Gewathu Gardening Guide",
  title: "Good advice helps every garden grow.",
  description:
    "Learn what to plant, when to water and how to care for your garden in Sri Lankan conditions.",
  cta: "Read gardening guides",
  href: "/guide" as const,
  articles: [
    {
      number: "01",
      title: "Start a vegetable garden",
      detail: "A simple guide for beginners",
    },
    {
      number: "02",
      title: "Choose the right compost",
      detail: "Healthier soil, stronger plants",
    },
    {
      number: "03",
      title: "Water plants the right way",
      detail: "Save water and avoid root problems",
    },
  ],
};

export const testimonials = {
  kicker: "Loved by home gardeners",
  titleLead: "Growing together,",
  titleRest: "one garden at a time.",
  quotes: [
    {
      quote:
        "The seedlings arrived healthy and carefully packed. The care guide was very useful for a beginner like me.",
      attribution: "Home gardener, Kandy",
    },
    {
      quote:
        "Everything needed for our balcony garden came in one order. Simple service and good-quality products.",
      attribution: "Customer, Colombo",
    },
  ],
};

export const newsletter = {
  kicker: "Grow with us",
  title: "Fresh ideas for your garden",
  description: "Receive seasonal tips, useful guides and selected offers.",
  placeholder: "Your email address",
  action: "Subscribe",
};

export const footer = {
  blurb:
    "Your local online destination for plants, seeds, tools and everything needed to grow at home.",
  whatsappLabel: "WhatsApp us",
  whatsappHref: "https://wa.me/94",
  contact: [
    "WhatsApp: +94 XX XXX XXXX",
    "Email: hello@gewathu.lk",
    "Sri Lanka",
  ],
  email: "hello@gewathu.lk",
  columns: [
    {
      title: "Shop",
      links: [
        { label: "Plants", href: "/shop" },
        { label: "Seeds & seedlings", href: "/shop" },
        { label: "Tools & equipment", href: "/shop" },
        { label: "Soil & fertilizers", href: "/shop" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Gardening Guide", href: "/guide" },
        { label: "Delivery information", href: "/about" },
        { label: "Returns & warranty", href: "/about" },
        { label: "Frequently asked questions", href: "/about" },
      ],
    },
  ],
  legal: "Terms · Privacy",
  copyright: "© 2026 Gewathu.lk. All rights reserved.",
};

export const toneClassName: Record<Tone, string> = {
  mint: "bg-tone-mint text-tone-mint-ink",
  lime: "bg-tone-lime text-tone-lime-ink",
  clay: "bg-tone-clay text-tone-clay-ink",
  soil: "bg-tone-soil text-tone-soil-ink",
  sun: "bg-tone-sun text-tone-sun-ink",
  water: "bg-tone-water text-tone-water-ink",
};
