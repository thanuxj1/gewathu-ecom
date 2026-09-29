import { getIcon } from "@/lib/icon-map";
import type { TrustBadgeItem } from "@/lib/types";

export function TrustBadges({ badges }: { badges: TrustBadgeItem[] }) {
  if (badges.length === 0) return null;

  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div
        className="grid grid-cols-2 gap-6 rounded-[14px] bg-white p-6 sm:grid-cols-4"
        style={{ boxShadow: "0 16px 50px 0 rgba(23,59,30,0.094)" }}
      >
        {badges.map((badge) => {
          const Icon = getIcon(badge.icon);
          return (
            <div key={badge.id} className="flex items-start gap-2.5">
              <Icon size={22} className="mt-0.5 shrink-0" style={{ color: "var(--color-add)" }} />
              <div>
                <p className="text-sm font-bold">{badge.title}</p>
                <p className="text-xs text-zinc-500">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
