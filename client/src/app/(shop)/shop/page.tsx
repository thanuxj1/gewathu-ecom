import Link from "next/link";
import { api } from "@/lib/api";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { getCategoryTheme } from "@/lib/category-theme";

async function getCategories(): Promise<Category[]> {
  try {
    return await api.get<Category[]>("/api/categories");
  } catch {
    return [];
  }
}

async function getProducts(params: { category?: string; q?: string }): Promise<Product[]> {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  try {
    return await api.get<Product[]>(`/api/products?${search.toString()}`);
  } catch {
    return [];
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts(params)]);
  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>
        {params.q ? `Results for "${params.q}"` : activeCategory ? activeCategory.name : "Shop all products"}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className="rounded-lg px-4 py-1.5 text-sm font-bold"
          style={
            !params.category
              ? { background: "var(--color-primary)", color: "#fff" }
              : { background: "var(--color-surface)", color: "var(--foreground)" }
          }
        >
          All
        </Link>
        {categories.map((category) => {
          const theme = getCategoryTheme(category.slug);
          const Icon = theme.icon;
          const active = params.category === category.slug;
          return (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold"
              style={
                active
                  ? { background: "var(--color-primary)", color: "#fff" }
                  : { background: "var(--color-surface)", color: "var(--foreground)" }
              }
            >
              <Icon size={14} />
              {category.name}
            </Link>
          );
        })}
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-sm text-zinc-500">No products found. Try a different search or category.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
