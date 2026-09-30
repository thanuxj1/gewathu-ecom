import { serverGet } from "@/lib/server-api";
import type { GuideCardItem } from "@/lib/types";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { GuideCardForm } from "@/components/admin/GuideCardForm";

export default async function AdminGuideCardsPage() {
  const cards = (await serverGet<GuideCardItem[]>("/api/admin/guide-cards")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Guide Cards</h1>
      <p className="mt-1 text-sm text-zinc-500">The &ldquo;Gewathu gardening guide&rdquo; cards on the homepage.</p>

      <div className="mt-6 rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Add guide card</h2>
        <div className="mt-3">
          <GuideCardForm />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="p-4"></th>
              <th className="p-4">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Blurb</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-zinc-500">
                  No guide cards yet.
                </td>
              </tr>
            )}
            {cards.map((card, i) => (
              <tr key={card.id} className="border-b border-black/[.06] last:border-0">
                <td className="p-4">
                  <ReorderButtons
                    path={`/api/admin/guide-cards/${card.id}`}
                    disableUp={i === 0}
                    disableDown={i === cards.length - 1}
                  />
                </td>
                <td className="p-4 text-zinc-500">{card.number}</td>
                <td className="p-4 font-medium">{card.title}</td>
                <td className="p-4 text-zinc-500">{card.blurb}</td>
                <td className="p-4">
                  <ActiveToggle path={`/api/admin/guide-cards/${card.id}`} active={card.active} />
                </td>
                <td className="p-4 text-right">
                  <DeleteButton path={`/api/admin/guide-cards/${card.id}`} confirmLabel={`Delete guide card "${card.title}"?`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
