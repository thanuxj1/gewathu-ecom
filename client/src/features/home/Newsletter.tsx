import { newsletter } from "@/features/home/home-content";

export function Newsletter() {
  return (
    <section className="shell section-space" aria-labelledby="newsletter-heading">
      <div className="grid items-center gap-8 min-[961px]:grid-cols-2 min-[961px]:gap-14">
        <div>
          <p className="kicker">{newsletter.kicker}</p>
          <h2 id="newsletter-heading" className="section-title section-title-sm">
            {newsletter.title}
          </h2>
          <p className="mt-4 leading-relaxed text-text-muted">{newsletter.description}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-surface-muted p-2 min-[681px]:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder={newsletter.placeholder}
            autoComplete="email"
            className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-text-muted"
          />
          <button
            type="button"
            className="h-12 rounded-button bg-accent px-6 font-extrabold text-accent-foreground hover:bg-accent-hover"
          >
            {newsletter.action}
          </button>
        </div>
      </div>
    </section>
  );
}
