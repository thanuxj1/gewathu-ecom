import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Local delivery", desc: "Across Sri Lanka" },
  { icon: BadgeCheck, title: "Quality checked", desc: "Products you can trust" },
  { icon: ShieldCheck, title: "Secure payment", desc: "Safe & convenient" },
  { icon: Headphones, title: "Friendly support", desc: "Help when you need it" },
];

export function TrustBadges() {
  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        className="grid grid-cols-2 gap-6 rounded-[14px] bg-white p-6 sm:grid-cols-4"
        style={{ boxShadow: "0 16px 50px 0 rgba(23,59,30,0.094)" }}
      >
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-2.5">
            <Icon size={22} className="mt-0.5 shrink-0" style={{ color: "var(--color-add)" }} />
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
