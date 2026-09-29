import Link from "next/link";
import { Plus } from "lucide-react";
import { serverGet } from "@/lib/server-api";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminProductsPage() {
  const products = await serverGet<Product[]>("/api/admin/products");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-black/[.06] bg-white">
        {!products || products.length === 0 ? (
          <p className="p-4 text-sm text-zinc-500">No products yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-black/[.06] last:border-0">
                  <td className="p-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="font-medium hover:text-primary">
                      {product.name}
                    </Link>
                    {product.featured && (
                      <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent-dark">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-zinc-500">{product.category.name}</td>
                  <td className="p-4">{formatPrice(product.priceCents)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <DeleteButton
                      path={`/api/admin/products/${product.id}`}
                      confirmLabel={`Delete "${product.name}"?`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
