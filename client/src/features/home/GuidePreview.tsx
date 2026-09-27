import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { guidePreview } from "@/features/home/home-content";

export function GuidePreview() {
  return (
    <section className="section-space bg-band" aria-labelledby="guide-preview">
      <div className="shell grid items-center gap-10 min-[961px]:grid-cols-2 min-[961px]:gap-20">
        <div>
          <p className="inline-flex items-center gap-2 text-[0.85rem] font-extrabold tracking-[0.12em] text-primary uppercase">
            <Icon name="book" className="h-5 w-5" />
            {guidePreview.eyebrow}
          </p>
          <h2 id="guide-preview" className="section-title">
            {guidePreview.title}
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-text-muted">{guidePreview.description}</p>
          <Button href={guidePreview.href} variant="primary" className="mt-6">
            {guidePreview.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
        <ol className="flex flex-col gap-3">
          {guidePreview.articles.map((article) => (
            <li key={article.number}>
              <Link
                href={guidePreview.href}
                className="grid grid-cols-[44px_1fr_20px] items-center gap-3.5 rounded-xl border border-border bg-surface p-4"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-sm font-extrabold text-primary">
                  {article.number}
                </span>
                <span>
                  <span className="block font-extrabold text-deep">{article.title}</span>
                  <span className="mt-1 block text-sm text-text-muted">{article.detail}</span>
                </span>
                <Icon name="chevron" className="h-5 w-5 text-text-muted" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
