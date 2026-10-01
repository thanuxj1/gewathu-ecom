import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { categories, toneClassName } from "@/features/home/home-content";
import { SectionHeading } from "@/features/home/SectionHeading";

export function CategoryGrid() {
  return (
    <section className="shell section-space" aria-labelledby="shop-categories">
      <SectionHeading
        id="shop-categories"
        kicker="Start exploring"
        title="Shop by category"
        href="/shop"
        linkLabel="View all products"
      />
      <ul className="grid grid-cols-1 gap-2.5 min-[681px]:grid-cols-2 min-[681px]:gap-4 min-[961px]:grid-cols-3">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={category.href}
              className="grid min-h-24 grid-cols-[58px_1fr_22px] items-center gap-4 rounded-card border border-border bg-surface px-4 py-4 transition-transform hover:-translate-y-0.5 hover:shadow-card motion-reduce:transform-none"
            >
              <span
                className={`grid h-[58px] w-[58px] place-items-center rounded-card ${toneClassName[category.tone]}`}
              >
                <Icon name={category.icon} className="h-7 w-7" />
              </span>
              <span>
                <span className="block font-extrabold text-deep">{category.name}</span>
                <span className="mt-1.5 block text-sm text-text-muted">{category.detail}</span>
              </span>
              <Icon name="chevron" className="h-5 w-5 text-text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
