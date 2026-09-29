import { serverGet } from "@/lib/server-api";
import type { TestimonialItem } from "@/lib/types";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { ActiveToggle } from "@/components/admin/ActiveToggle";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default async function AdminTestimonialsPage() {
  const testimonials = (await serverGet<TestimonialItem[]>("/api/admin/testimonials")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Testimonials</h1>
      <p className="mt-1 text-sm text-zinc-500">Customer quotes shown on the homepage.</p>

      <div className="mt-6 rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Add testimonial</h2>
        <div className="mt-3">
          <TestimonialForm />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="p-4"></th>
              <th className="p-4">Quote</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-zinc-500">
                  No testimonials yet.
                </td>
              </tr>
            )}
            {testimonials.map((t, i) => (
              <tr key={t.id} className="border-b border-black/[.06] last:border-0">
                <td className="p-4">
                  <ReorderButtons
                    path={`/api/admin/testimonials/${t.id}`}
                    disableUp={i === 0}
                    disableDown={i === testimonials.length - 1}
                  />
                </td>
                <td className="p-4 max-w-md text-zinc-600 italic">&ldquo;{t.quote}&rdquo;</td>
                <td className="p-4 font-medium">{t.author}</td>
                <td className="p-4">
                  <ActiveToggle path={`/api/admin/testimonials/${t.id}`} active={t.active} />
                </td>
                <td className="p-4 text-right">
                  <DeleteButton path={`/api/admin/testimonials/${t.id}`} confirmLabel={`Delete testimonial by "${t.author}"?`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
