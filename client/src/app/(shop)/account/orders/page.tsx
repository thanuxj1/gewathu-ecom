import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Order } from "@/lib/types";
import { formatDate, formatPrice, orderRef } from "@/lib/format";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getMyOrders(): Promise<Order[] | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  const res = await fetch(`${API_URL}/api/orders/mine`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function MyOrdersPage() {
  const orders = await getMyOrders();
  if (orders === null) redirect("/login");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>My orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">
          No orders yet.{" "}
          <Link href="/shop" className="text-primary underline">
            Start shopping
          </Link>
          .
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block rounded-xl border border-black/[.06] p-5 hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{orderRef(order.id)}</span>
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{formatDate(order.createdAt)}</p>
              <p className="mt-2 font-semibold">{formatPrice(order.totalCents)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
