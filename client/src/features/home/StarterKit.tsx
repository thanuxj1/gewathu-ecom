import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { starterKit } from "@/features/home/home-content";

export function StarterKit() {
  return (
    <section className="shell my-[var(--section-space)]">
      <div className="grid items-center gap-10 rounded-panel bg-deep px-7 py-11 text-on-deep min-[961px]:grid-cols-[1.2fr_0.8fr] min-[961px]:px-[7%] min-[961px]:py-14">
        <div>
          <p className="kicker kicker-inverse">{starterKit.kicker}</p>
          <h2 className="section-title section-title-inverse">
            {starterKit.titleLead}
            <br />
            {starterKit.titleRest}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-on-deep-muted">{starterKit.description}</p>
          <Button href={starterKit.href} className="mt-7">
            {starterKit.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="bundle-mark grid h-48 w-48 -rotate-3 grid-cols-3 items-center rounded-full bg-accent-soft p-8 text-primary min-[681px]:h-60 min-[681px]:w-60">
            {starterKit.icons.map((icon) => (
              <Icon key={icon} name={icon} className="mx-auto h-11 w-11" />
            ))}
          </div>
          <p className="rounded-full bg-surface px-4 py-2 text-sm font-extrabold text-deep">
            {starterKit.badge}
          </p>
        </div>
      </div>
    </section>
  );
}
