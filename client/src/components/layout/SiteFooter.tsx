import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { footer } from "@/features/home/home-content";

export function SiteFooter() {
  return (
    <footer className="bg-deep pt-16 text-on-deep">
      <div className="shell grid gap-10 pb-12 min-[681px]:grid-cols-2 min-[961px]:grid-cols-[1.5fr_1fr_1fr_1fr] min-[961px]:gap-14">
        <div className="min-[681px]:col-span-2 min-[961px]:col-span-1">
          <BrandMark framed />
          <p className="mt-4 max-w-sm leading-relaxed text-on-deep-muted">{footer.blurb}</p>
          <a
            href={footer.whatsappHref}
            className="mt-4 inline-flex items-center gap-2 font-extrabold text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="message" className="h-5 w-5" />
            {footer.whatsappLabel}
          </a>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-5 text-base font-bold">{column.title}</h2>
            <ul className="space-y-3 text-sm text-on-deep-muted">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-on-deep">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="min-[681px]:col-span-2 min-[961px]:col-span-1">
          <h2 className="mb-5 text-base font-bold">Contact</h2>
          <ul className="space-y-3 text-sm text-on-deep-muted">
            <li>{footer.contact[0]}</li>
            <li>
              <a href={`mailto:${footer.email}`} className="hover:text-on-deep">
                Email: {footer.email}
              </a>
            </li>
            <li>{footer.contact[2]}</li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-on-deep/15 py-5 text-sm text-on-deep-muted min-[681px]:flex-row min-[681px]:items-center min-[681px]:justify-between">
        <p>{footer.copyright}</p>
        <p>{footer.legal}</p>
      </div>
    </footer>
  );
}
