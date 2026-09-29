import Link from "next/link";
import { ArrowRight, Droplets, Leaf, Sprout } from "lucide-react";
import { api } from "@/lib/api";
import type { Category, HomepageContent, Product } from "@/lib/types";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { TrustBadges } from "@/components/TrustBadges";
import { Reveal } from "@/components/Reveal";

async function getCategories(): Promise<Category[]> {
  try {
    return await api.get<Category[]>("/api/categories");
  } catch {
    return [];
  }
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await api.get<Product[]>("/api/products?featured=true");
  } catch {
    return [];
  }
}

async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    return await api.get<HomepageContent>("/api/homepage");
  } catch {
    return null;
  }
}

export default async function Home() {
  const [categories, featured, content] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getHomepageContent(),
  ]);

  const settings = content?.settings;
  const heroSlides = content?.heroSlides ?? [];
  const trustBadges = content?.trustBadges ?? [];
  const testimonials = content?.testimonials ?? [];
  const guideCards = content?.guideCards ?? [];

  return (
    <div>
      <HeroSlideshow slides={heroSlides} />
      <TrustBadges badges={trustBadges} />

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent-dark)" }}>
              Start exploring
            </p>
            <h2 className="mt-1 text-3xl" style={{ color: "var(--color-primary)" }}>
              Shop by category
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-bold hover:underline sm:block" style={{ color: "var(--color-primary)" }}>
            View all products
          </Link>
        </Reveal>

        {categories.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">
            No categories loaded — make sure the API server is running and seeded.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((category, i) => (
              <Reveal key={category.id} delay={i * 0.06}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Featured products */}
      <section className="py-16" style={{ background: "var(--color-surface)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent-dark)" }}>
                Popular this week
              </p>
              <h2 className="mt-1 text-3xl" style={{ color: "var(--color-primary)" }}>
                Garden favourites
              </h2>
            </div>
            <Link href="/shop" className="hidden text-sm font-bold hover:underline sm:block" style={{ color: "var(--color-primary)" }}>
              Browse the shop
            </Link>
          </Reveal>

          {featured.length === 0 ? (
            <p className="mt-6 text-sm text-zinc-500">No featured products yet.</p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.slice(0, 4).map((product, i) => (
                <Reveal key={product.id} delay={i * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seasonal banner */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="rounded-[20px] p-8 sm:p-12" style={{ background: "var(--color-primary-light)" }}>
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent-dark)" }}>
            {settings?.seasonalEyebrow ?? "Seasonal essentials"}
          </p>
          <h2 className="mt-2 max-w-lg text-3xl" style={{ color: "var(--color-primary)" }}>
            {settings?.seasonalTitle ?? "Ready for the next planting season?"}
          </h2>
          <p className="mt-2 max-w-lg text-sm text-zinc-600">
            {settings?.seasonalBody ?? "Choose the right seeds, growing media and tools for a productive home garden."}
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-extrabold text-[#222] transition hover:brightness-95"
            style={{ background: "var(--color-accent)" }}
          >
            {settings?.seasonalCtaLabel ?? "Shop seasonal picks"} <ArrowRight size={16} />
          </Link>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Sprout, title: "Vegetable growing", blurb: "Seeds, trays and starter media" },
              { icon: Droplets, title: "Water wisely", blurb: "Simple drip and watering solutions" },
              { icon: Leaf, title: "Healthy soil", blurb: "Compost and organic nutrition" },
            ].map(({ icon: Icon, title, blurb }) => (
              <div key={title} className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"
                  style={{ color: "var(--color-primary)" }}
                >
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs text-zinc-600">{blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Starter kit */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal
          className="flex flex-col items-start gap-6 rounded-[20px] p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between"
          style={{ background: "var(--color-primary)" }}
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-200">
              {settings?.starterEyebrow ?? "Simple way to begin"}
            </p>
            <h2 className="mt-2 max-w-md text-3xl">{settings?.starterTitle ?? "Your first home garden, all in one box."}</h2>
            <p className="mt-2 max-w-md text-sm text-emerald-50">
              {settings?.starterBody ??
                "A practical starter bundle with seeds, growing media, hand tools and an easy Sinhala/English planting guide."}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              {settings?.starterBadge ?? "Beginner friendly"}
            </span>
            <Link
              href="/shop"
              className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-extrabold text-[#222] transition hover:brightness-95"
              style={{ background: "var(--color-accent)" }}
            >
              {settings?.starterCtaLabel ?? "Explore starter kits"} <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Gardening guide */}
      <section id="guide" className="scroll-mt-20 py-16" style={{ background: "var(--color-surface)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent-dark)" }}>
              Gewathu gardening guide
            </p>
            <h2 className="mt-1 max-w-lg text-3xl" style={{ color: "var(--color-primary)" }}>
              Good advice helps every garden grow.
            </h2>
            <p className="mt-2 max-w-lg text-sm text-zinc-600">
              Learn what to plant, when to water and how to care for your garden in Sri Lankan conditions.
            </p>
          </Reveal>

          {guideCards.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {guideCards.map((guide, i) => (
                <Reveal key={guide.id} delay={i * 0.08}>
                  <div
                    className="rounded-[14px] border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span className="text-sm font-black" style={{ color: "var(--color-accent-dark)" }}>
                      {guide.number}
                    </span>
                    <p className="mt-2 font-bold" style={{ color: "var(--color-primary)" }}>
                      {guide.title}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{guide.blurb}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--color-accent-dark)" }}>
              Loved by home gardeners
            </p>
            <h2 className="mt-1 max-w-lg text-3xl" style={{ color: "var(--color-primary)" }}>
              Growing together, one garden at a time.
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <blockquote className="rounded-[14px] p-6" style={{ background: "var(--color-primary-light)" }}>
                  <p className="text-sm italic text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-3 text-xs font-bold" style={{ color: "var(--color-primary)" }}>
                    — {t.author}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 text-white" style={{ background: "var(--color-primary-dark)" }}>
        <Reveal className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-200">
            {settings?.newsletterEyebrow ?? "Grow with us"}
          </p>
          <h2 className="mt-1 text-3xl">{settings?.newsletterTitle ?? "Fresh ideas for your garden"}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-emerald-100">
            {settings?.newsletterBody ?? "Receive seasonal tips, useful guides and selected offers."}
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
