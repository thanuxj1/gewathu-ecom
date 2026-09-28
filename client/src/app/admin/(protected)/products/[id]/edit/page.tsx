import { notFound } from "next/navigation";
import { serverGet } from "@/lib/server-api";
import type { Category, Product } from "@/lib/types";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    serverGet<Product>(`/api/admin/products/${id}`),
    serverGet<Category[]>("/api/categories").then((c) => c ?? []),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit product</h1>
      <div className="mt-6">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
