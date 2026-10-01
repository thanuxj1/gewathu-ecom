import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type SectionHeadingProps = {
  id: string;
  kicker: string;
  title: string;
  href: string;
  linkLabel: string;
};

export function SectionHeading({ id, kicker, title, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id} className="section-title">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-2 font-extrabold text-primary min-[681px]:inline-flex"
      >
        {linkLabel}
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function Stars() {
  return (
    <div className="flex text-star" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" className="h-3.5 w-3.5" />
      ))}
    </div>
  );
}
