import { serverGet } from "@/lib/server-api";
import type { Category } from "@/lib/types";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = (await serverGet<Category[]>("/api/categories")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">New product</h1>
      <div className="mt-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
