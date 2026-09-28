"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronRight, Sprout } from "lucide-react";

type Slide = {
  eyebrow: string;
  titleWhite: string;
  titleAccent: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Everything for your garden",
    titleWhite: "Grow better.",
    titleAccent: "Live greener.",
    body: "Plants, seeds, garden tools and trusted supplies—carefully selected for Sri Lankan homes.",
    primaryCta: { label: "Shop Now", href: "/shop" },
    secondaryCta: { label: "Learn gardening", href: "/#guide" },
  },
  {
    eyebrow: "Seasonal essentials",
    titleWhite: "Ready for the",
    titleAccent: "next planting season?",
    body: "Choose the right seeds, growing media and tools for a productive home garden.",
    primaryCta: { label: "Shop seasonal picks", href: "/shop" },
    secondaryCta: { label: "View categories", href: "/#categories" },
  },
  {
    eyebrow: "Simple way to begin",
    titleWhite: "Your first home garden,",
    titleAccent: "all in one box.",
    body: "A practical starter bundle with seeds, growing media, hand tools and an easy planting guide.",
    primaryCta: { label: "Explore starter kits", href: "/shop" },
    secondaryCta: { label: "Read the guide", href: "/#guide" },
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-garden.webp)", backgroundColor: "#dcebd4" }}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,39,17,0.89) 0%, rgba(15,58,25,0.74) 35%, rgba(14,55,24,0.15) 67%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <AnimatePresence mode="wait">
          <motion.div key={active} variants={container} initial="hidden" animate="visible" exit="hidden">
            <motion.p
              variants={item}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-100"
            >
              <Sprout size={13} /> {slide.eyebrow}
            </motion.p>
            <motion.h1 variants={item} className="mt-3 max-w-2xl text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              {slide.titleWhite}
              <br />
              <span style={{ color: "var(--color-accent)" }}>{slide.titleAccent}</span>
            </motion.h1>
            <motion.p variants={item} className="mt-4 max-w-md text-base text-emerald-50">
              {slide.body}
            </motion.p>

            <motion.form
              variants={item}
              action="/shop"
              className="mt-7 flex max-w-md items-center gap-2 rounded-lg bg-white p-1.5"
            >
              <input
                name="q"
                placeholder="Search"
                className="w-full rounded-md px-4 py-2 text-sm text-foreground outline-none"
              />
              <button
                className="rounded-md px-5 py-2 text-sm font-extrabold text-[#222]"
                style={{ background: "var(--color-accent)" }}
              >
                Search
              </button>
            </motion.form>

            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-5">
              <Link
                href={slide.primaryCta.href}
                className="group flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-extrabold text-[#222] transition hover:brightness-95"
                style={{ background: "var(--color-accent)" }}
              >
                {slide.primaryCta.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="group flex items-center gap-1 text-sm font-extrabold text-white"
              >
                {slide.secondaryCta.label}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.eyebrow}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                background: i === active ? "var(--color-accent)" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>

      <motion.a
        href="#categories"
        aria-label="Scroll to categories"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/80 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  );
}
