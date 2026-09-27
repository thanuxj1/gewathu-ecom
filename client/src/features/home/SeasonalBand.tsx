import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { seasonal } from "@/features/home/home-content";

export function SeasonalBand() {
  return (
    <section className="shell my-[var(--section-space)] grid items-center gap-8 min-[961px]:grid-cols-[0.8fr_1.2fr] min-[961px]:gap-16">
      <div>
        <p className="kicker">{seasonal.kicker}</p>
        <h2 className="section-title">{seasonal.title}</h2>
        <p className="mt-4 max-w-md leading-relaxed text-text-muted">{seasonal.description}</p>
        <Button href={seasonal.href} className="mt-6">
          {seasonal.cta}
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>
      <ul className="flex gap-3.5 overflow-x-auto pb-2 min-[681px]:grid min-[681px]:grid-cols-3 min-[681px]:overflow-visible">
        {seasonal.cards.map((card) => (
          <li key={card.title} className="min-w-[72vw] min-[681px]:min-w-0">
            <article className="flex min-h-52 flex-col justify-end rounded-card border border-border bg-surface-muted p-6">
              <Icon name={card.icon} className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-extrabold text-deep">{card.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{card.detail}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
