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

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
        <Link
          href="/shop"
          className="shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-bold"
          style={
            !params.category
              ? { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)" }
              : { background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }
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
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-bold"
              style={
                active
                  ? { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)" }
                  : { background: "var(--color-surface)", color: "var(--foreground)", borderColor: "var(--color-border)" }
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
