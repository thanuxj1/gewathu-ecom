import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Plants", slug: "plants" },
  { name: "Seeds & Seedlings", slug: "seeds-seedlings" },
  { name: "Pots & Planters", slug: "pots-planters" },
  { name: "Soil & Fertilizers", slug: "soil-fertilizers" },
  { name: "Garden Tools", slug: "garden-tools" },
  { name: "Watering & Irrigation", slug: "watering-irrigation" },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`Seeded ${categories.length} categories`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
