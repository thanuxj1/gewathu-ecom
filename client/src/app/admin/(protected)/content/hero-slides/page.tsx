import Link from "next/link";
import { Plus } from "lucide-react";
import { serverGet } from "@/lib/server-api";
import type { HeroSlide } from "@/lib/types";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { ActiveToggle } from "@/components/admin/ActiveToggle";

export default async function AdminHeroSlidesPage() {
  const slides = (await serverGet<HeroSlide[]>("/api/admin/hero-slides")) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hero Slides</h1>
        <Link
          href="/admin/content/hero-slides/new"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New slide
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="p-4"></th>
              <th className="p-4">Eyebrow</th>
              <th className="p-4">Heading</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {slides.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-zinc-500">
                  No hero slides yet.
                </td>
              </tr>
            )}
            {slides.map((slide, i) => (
              <tr key={slide.id} className="border-b border-black/[.06] last:border-0">
                <td className="p-4">
                  <ReorderButtons
                    path={`/api/admin/hero-slides/${slide.id}`}
                    disableUp={i === 0}
                    disableDown={i === slides.length - 1}
                  />
                </td>
                <td className="p-4 text-zinc-500">{slide.eyebrow}</td>
                <td className="p-4 font-medium">
                  {slide.titleWhite} {slide.titleAccent}
                </td>
                <td className="p-4">
                  <ActiveToggle path={`/api/admin/hero-slides/${slide.id}`} active={slide.active} />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/content/hero-slides/${slide.id}/edit`} className="text-sm text-primary hover:underline">
                      Edit
                    </Link>
                    <DeleteButton
                      path={`/api/admin/hero-slides/${slide.id}`}
                      confirmLabel={`Delete this slide ("${slide.titleWhite} ${slide.titleAccent}")?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
