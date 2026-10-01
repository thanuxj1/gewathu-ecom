import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatLkr } from "@/lib/format";
import { featuredProducts, toneClassName } from "@/features/home/home-content";
import { SectionHeading, Stars } from "@/features/home/SectionHeading";

export function FeaturedProducts() {
  return (
    <section className="section-space bg-surface-muted" aria-labelledby="garden-favourites">
      <div className="shell">
        <SectionHeading
          id="garden-favourites"
          kicker="Popular this week"
          title="Garden favourites"
          href="/shop"
          linkLabel="Browse the shop"
        />
        <ul className="flex gap-4 overflow-x-auto pb-2 min-[681px]:grid min-[681px]:grid-cols-2 min-[681px]:overflow-visible min-[961px]:grid-cols-4">
          {featuredProducts.map((product) => (
            <li key={product.id} className="min-w-[78vw] min-[681px]:min-w-0">
              <article className="overflow-hidden rounded-card border border-border bg-surface">
                <div
                  className={`relative grid h-[210px] place-items-center ${toneClassName[product.tone]}`}
                >
                  {product.imageSrc ? (
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 680px) 78vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <Icon name={product.icon} className="h-20 w-20" />
                  )}
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-surface px-2.5 py-1.5 text-xs font-extrabold text-foreground">
                    {product.badge}
                  </span>
                </div>
                <div className="p-4">
                  <Stars />
                  <h3 className="mt-2 font-extrabold text-deep">{product.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{product.detail}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="font-extrabold text-deep">{formatLkr(product.priceRupees)}</p>
                    <Button size="sm" variant="primary" ariaLabel={`Add ${product.name}`}>
                      <Icon name="cart" className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
