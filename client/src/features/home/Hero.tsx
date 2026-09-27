import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { benefits, brand, hero } from "@/features/home/home-content";

export function Hero() {
  return (
    <>
      <section className="relative grid min-h-[640px] items-end overflow-hidden bg-hero pb-16 min-[681px]:items-center min-[681px]:pb-20">
        {brand.heroSrc ? (
          <Image
            src={brand.heroSrc}
            alt={brand.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[63%_center] min-[681px]:object-center"
          />
        ) : (
          <div className="hero-fallback absolute inset-0" role="img" aria-label={brand.heroAlt} />
        )}
        <div className="hero-shade absolute inset-0" />

        <div className="shell relative z-10 py-16 text-on-deep min-[681px]:py-[4.5rem]">
          <p className="inline-flex items-center gap-2 text-[0.85rem] font-extrabold tracking-[0.12em] text-primary-soft uppercase">
            <Icon name="sprout" className="h-5 w-5" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(3.25rem,6.2vw,5.8rem)] leading-[0.94] font-bold tracking-[-0.055em]">
            {hero.titleLead}
            <br />
            <span className="text-accent">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-on-deep min-[681px]:text-lg">
            {hero.description}
          </p>

          <div className="mt-7 flex w-full max-w-[610px] items-center gap-3 rounded-xl bg-surface py-1.5 pr-1.5 pl-4 text-foreground shadow-search">
            <Icon name="search" className="h-5 w-5 shrink-0 text-primary" />
            <input
              id="site-search"
              type="search"
              placeholder={hero.searchPlaceholder}
              aria-label={hero.searchLabel}
              className="h-12 min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted"
            />
            <Button href="/shop" className="shrink-0">
              {hero.searchAction}
            </Button>
          </div>

          <div className="mt-7 flex flex-col items-start gap-4 min-[681px]:flex-row min-[681px]:items-center min-[681px]:gap-7">
            <Button href="/shop">
              {hero.primaryCta}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 font-extrabold text-on-deep hover:text-accent"
            >
              {hero.secondaryCta}
              <Icon name="chevron" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="shell relative z-10 -mt-10 min-[681px]:-mt-12" aria-label="Why shop with Gewathu">
        <ul className="grid grid-cols-2 rounded-card border border-border bg-surface px-2 py-3 shadow-card min-[961px]:grid-cols-4 min-[961px]:px-3 min-[961px]:py-5">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className={`flex items-center gap-3 px-3 py-2 min-[961px]:px-4 ${
                index < benefits.length - 1 ? "min-[961px]:border-r min-[961px]:border-border" : ""
              }`}
            >
              <Icon name={benefit.icon} className="h-7 w-7 shrink-0 text-primary" />
              <span>
                <span className="block text-sm font-extrabold text-deep max-[680px]:text-[0.78rem]">
                  {benefit.title}
                </span>
                <span className="mt-0.5 hidden text-sm text-text-muted min-[681px]:block">
                  {benefit.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
