import { serverGet } from "@/lib/server-api";
import type { Category } from "@/lib/types";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function AdminCategoriesPage() {
  const categories = (await serverGet<Category[]>("/api/categories")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="mt-6 rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Add category</h2>
        <div className="mt-3">
          <CategoryForm />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="p-4">Icon</th>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-black/[.06] last:border-0">
                <td className="p-4 text-lg">{category.icon}</td>
                <td className="p-4 font-medium">{category.name}</td>
                <td className="p-4 text-zinc-500">{category.slug}</td>
                <td className="p-4 text-zinc-500">{category.description}</td>
                <td className="p-4">
                  <DeleteButton
                    path={`/api/admin/categories/${category.id}`}
                    confirmLabel={`Delete "${category.name}"? Products must be moved first.`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
