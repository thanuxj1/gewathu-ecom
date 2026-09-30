import { serverGet } from "@/lib/server-api";
import type { TrustBadgeItem } from "@/lib/types";
import { getIcon } from "@/lib/icon-map";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { TrustBadgeForm } from "@/components/admin/TrustBadgeForm";

export default async function AdminTrustBadgesPage() {
  const badges = (await serverGet<TrustBadgeItem[]>("/api/admin/trust-badges")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Trust Badges</h1>
      <p className="mt-1 text-sm text-zinc-500">The strip of icons shown just below the hero slideshow.</p>

      <div className="mt-6 rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Add trust badge</h2>
        <div className="mt-3">
          <TrustBadgeForm />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="p-4"></th>
              <th className="p-4">Icon</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {badges.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-zinc-500">
                  No trust badges yet.
                </td>
              </tr>
            )}
            {badges.map((badge, i) => {
              const Icon = getIcon(badge.icon);
              return (
                <tr key={badge.id} className="border-b border-black/[.06] last:border-0">
                  <td className="p-4">
                    <ReorderButtons
                      path={`/api/admin/trust-badges/${badge.id}`}
                      disableUp={i === 0}
                      disableDown={i === badges.length - 1}
                    />
                  </td>
                  <td className="p-4">
                    <Icon size={18} style={{ color: "var(--color-add)" }} />
                  </td>
                  <td className="p-4 font-medium">{badge.title}</td>
                  <td className="p-4 text-zinc-500">{badge.description}</td>
                  <td className="p-4">
                    <ActiveToggle path={`/api/admin/trust-badges/${badge.id}`} active={badge.active} />
                  </td>
                  <td className="p-4 text-right">
                    <DeleteButton
                      path={`/api/admin/trust-badges/${badge.id}`}
                      confirmLabel={`Delete trust badge "${badge.title}"?`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
