import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Plants",
    slug: "plants",
    description: "Indoor, outdoor & fruit plants",
    icon: "🌿",
  },
  {
    name: "Seeds & Seedlings",
    slug: "seeds-seedlings",
    description: "Vegetables, herbs & flowers",
    icon: "🌱",
  },
  {
    name: "Pots & Planters",
    slug: "pots-planters",
    description: "Clay, plastic & grow bags",
    icon: "🪴",
  },
  {
    name: "Soil & Fertilizers",
    slug: "soil-fertilizers",
    description: "Compost, coco peat & nutrition",
    icon: "🌾",
  },
  {
    name: "Garden Tools",
    slug: "garden-tools",
    description: "Everything for hands-on gardening",
    icon: "🛠️",
  },
  {
    name: "Watering & Irrigation",
    slug: "watering-irrigation",
    description: "Hoses, sprinklers & drip kits",
    icon: "💧",
  },
];

const products: Array<{
  name: string;
  slug: string;
  description: string;
  unit: string;
  badge?: string;
  featured?: boolean;
  priceCents: number;
  stock: number;
  categorySlug: string;
}> = [
  {
    name: "Organic Vermicompost",
    slug: "organic-vermicompost",
    description: "Rich, odour-free compost that improves soil structure and root growth.",
    unit: "5 kg bag",
    badge: "Best seller",
    featured: true,
    priceCents: 125000,
    stock: 60,
    categorySlug: "soil-fertilizers",
  },
  {
    name: "Home Vegetable Seed Pack",
    slug: "home-vegetable-seed-pack",
    description: "8 popular home-garden vegetable varieties, ready for the next planting season.",
    unit: "8 popular varieties",
    badge: "Starter pick",
    featured: true,
    priceCents: 89000,
    stock: 80,
    categorySlug: "seeds-seedlings",
  },
  {
    name: "3-Piece Garden Tool Set",
    slug: "3-piece-garden-tool-set",
    description: "Trowel, fork and cultivator — everything for hands-on gardening.",
    unit: "Trowel, fork & cultivator",
    badge: "New",
    featured: true,
    priceCents: 245000,
    stock: 40,
    categorySlug: "garden-tools",
  },
  {
    name: "Herb Seedling Collection",
    slug: "herb-seedling-collection",
    description: "6 healthy herb seedlings ready to transplant into your garden or pots.",
    unit: "6 healthy seedlings",
    badge: "Fresh stock",
    featured: true,
    priceCents: 160000,
    stock: 50,
    categorySlug: "seeds-seedlings",
  },
  {
    name: "Areca Palm Indoor Plant",
    slug: "areca-palm-indoor-plant",
    description: "A lush air-purifying palm that thrives indoors with bright, indirect light.",
    unit: "1.5 ft, nursery pot",
    priceCents: 320000,
    stock: 20,
    categorySlug: "plants",
  },
  {
    name: "Mango Sapling (Grafted)",
    slug: "mango-sapling-grafted",
    description: "A grafted mango sapling that fruits sooner than a seed-grown tree.",
    unit: "2 ft sapling",
    priceCents: 180000,
    stock: 25,
    categorySlug: "plants",
  },
  {
    name: "Terracotta Pot Set",
    slug: "terracotta-pot-set",
    description: "Classic clay pots with drainage holes, in three sizes.",
    unit: "Set of 3",
    priceCents: 145000,
    stock: 35,
    categorySlug: "pots-planters",
  },
  {
    name: "Grow Bags (Heavy Duty)",
    slug: "grow-bags-heavy-duty",
    description: "UV-stabilised fabric grow bags for vegetables and root crops.",
    unit: "Pack of 5, 15L",
    priceCents: 98000,
    stock: 55,
    categorySlug: "pots-planters",
  },
  {
    name: "Coco Peat Block",
    slug: "coco-peat-block",
    description: "100% natural growing medium that improves aeration and moisture retention.",
    unit: "5 kg compressed block",
    priceCents: 65000,
    stock: 70,
    categorySlug: "soil-fertilizers",
  },
  {
    name: "Vermiwash Liquid Fertilizer",
    slug: "vermiwash-liquid-fertilizer",
    description: "A powerful liquid bio-fertilizer that enhances growth and strengthens immunity.",
    unit: "1 litre bottle",
    priceCents: 85000,
    stock: 45,
    categorySlug: "soil-fertilizers",
  },
  {
    name: "Hand Cultivator & Weeder",
    slug: "hand-cultivator-weeder",
    description: "Ergonomic hand tool for loosening soil and clearing weeds.",
    unit: "Single tool",
    priceCents: 65000,
    stock: 60,
    categorySlug: "garden-tools",
  },
  {
    name: "Pruning Shears",
    slug: "pruning-shears",
    description: "Sharp, comfortable-grip shears for trimming and light pruning.",
    unit: "Single pair",
    priceCents: 79000,
    stock: 50,
    categorySlug: "garden-tools",
  },
  {
    name: "6-Pattern Spray Nozzle",
    slug: "6-pattern-spray-nozzle",
    description: "Adjustable hose nozzle for everything from misting seedlings to jet spray.",
    unit: "Single nozzle",
    priceCents: 55000,
    stock: 65,
    categorySlug: "watering-irrigation",
  },
  {
    name: "Drip Irrigation Starter Kit",
    slug: "drip-irrigation-starter-kit",
    description: "A simple drip kit to water 10-15 pots evenly with minimal waste.",
    unit: "10m kit",
    priceCents: 320000,
    stock: 18,
    categorySlug: "watering-irrigation",
  },
  {
    name: "Watering Can (5L)",
    slug: "watering-can-5l",
    description: "Durable plastic watering can with a fine rose head for gentle watering.",
    unit: "5 litre",
    priceCents: 72000,
    stock: 55,
    categorySlug: "watering-irrigation",
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { description: category.description, icon: category.icon },
      create: category,
    });
  }
  console.log(`Seeded ${categories.length} categories`);

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categorySlug },
    });
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        unit: product.unit,
        badge: product.badge,
        featured: product.featured ?? false,
        priceCents: product.priceCents,
        stock: product.stock,
        categoryId: category.id,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        unit: product.unit,
        badge: product.badge,
        featured: product.featured ?? false,
        priceCents: product.priceCents,
        stock: product.stock,
        categoryId: category.id,
      },
    });
  }
  console.log(`Seeded ${products.length} products`);

  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@gewathu.lk";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "changeme123";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Admin",
      password: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
    },
  });
  console.log(`Seeded admin user: ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
