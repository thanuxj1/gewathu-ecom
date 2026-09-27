import { testimonials } from "@/features/home/home-content";
import { Stars } from "@/features/home/SectionHeading";

export function Testimonials() {
  return (
    <section className="shell section-space grid items-center gap-8 min-[961px]:grid-cols-[0.75fr_1.25fr] min-[961px]:gap-16">
      <div>
        <p className="kicker">{testimonials.kicker}</p>
        <h2 className="section-title">
          {testimonials.titleLead}
          <br />
          {testimonials.titleRest}
        </h2>
      </div>
      <div className="grid gap-4 min-[681px]:grid-cols-2">
        {testimonials.quotes.map((item) => (
          <figure key={item.attribution} className="rounded-card border border-border bg-surface p-7 shadow-card">
            <Stars />
            <blockquote className="mt-4 leading-relaxed text-foreground">
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption className="mt-4 font-extrabold text-primary">— {item.attribution}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
