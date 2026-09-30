import { notFound } from "next/navigation";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartForm } from "@/components/AddToCartForm";
import { getCategoryTheme } from "@/lib/category-theme";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/api/products/${slug}`);
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const theme = getCategoryTheme(product.category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-zinc-500">
        <Link href="/shop" className="hover:underline">Shop</Link>
        {" / "}
        <Link href={`/shop?category=${product.category.slug}`} className="hover:underline">
          {product.category.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <ProductImage
            imageUrl={product.imageUrl}
            name={product.name}
            categorySlug={product.category.slug}
            className="aspect-square w-full"
          />
        </div>

        <div>
          {product.badge && (
            <span
              className="inline-block rounded-full bg-white px-3 py-1.5 text-xs font-black shadow-sm"
              style={{ color: theme.iconColor }}
            >
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>
            {product.name}
          </h1>
          {product.unit && <p className="mt-1 text-sm text-zinc-500">{product.unit}</p>}
          <p className="mt-4 text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            {formatPrice(product.priceCents)}
          </p>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">{product.description}</p>
          )}

          <p className="mt-4 text-sm font-medium">
            {product.stock > 0 ? (
              <span style={{ color: "var(--color-add)" }}>In stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
