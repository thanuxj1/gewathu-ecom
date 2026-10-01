import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { footer } from "@/features/home/home-content";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "About Gewathu.lk and how to get in touch.",
};

const values = [
  {
    icon: "truck" as const,
    title: "Local delivery",
    detail: "Free delivery in selected areas for orders above Rs. 5,000.",
  },
  {
    icon: "shield" as const,
    title: "Quality checked",
    detail: "Plants, seeds and supplies are checked before they're packed for you.",
  },
  {
    icon: "headphones" as const,
    title: "Friendly support",
    detail: "Message us on WhatsApp — a real person replies, in Sinhala or English.",
  },
];

export default function AboutPage() {
  return (
    <div className="shell section-space">
      <p className="kicker">About Gewathu.lk</p>
      <h1 className="section-title">Growing together, one garden at a time.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">{footer.blurb}</p>

      <div className="mt-10 grid gap-5 min-[681px]:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-xl border border-border bg-surface p-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon name={value.icon} className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-extrabold text-deep">{value.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{value.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 rounded-xl border border-border bg-surface p-6 min-[681px]:grid-cols-2 min-[681px]:p-10">
        <div>
          <h2 className="text-xl font-extrabold text-deep">Get in touch</h2>
          <p className="mt-2 leading-relaxed text-text-muted">
            Questions about an order, a product, or just need gardening advice? Reach us any time.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <a href={footer.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon name="message" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-text-muted">WhatsApp</span>
                <span className="font-extrabold text-deep">+94 XX XXX XXXX</span>
              </span>
            </a>
            <a href={`mailto:${footer.email}`} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon name="headphones" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-text-muted">Email</span>
                <span className="font-extrabold text-deep">{footer.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Icon name="truck" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-text-muted">Based in</span>
                <span className="font-extrabold text-deep">Sri Lanka</span>
              </span>
            </div>
          </div>
          <Button href={footer.whatsappHref} variant="accent" className="mt-8">
            {footer.whatsappLabel}
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-deep">Delivery & support hours</h2>
          <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-text-muted">
            <li>Monday – Saturday: 8.30am – 6.00pm</li>
            <li>Sunday: 9.00am – 1.00pm</li>
            <li>Free delivery in selected areas for orders above Rs. 5,000.</li>
            <li>Island-wide delivery available for other areas, charged at checkout.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
