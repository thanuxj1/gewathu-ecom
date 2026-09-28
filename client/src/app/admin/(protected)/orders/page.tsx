import Link from "next/link";
import { serverGet } from "@/lib/server-api";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatPrice, orderRef } from "@/lib/format";

const STATUSES: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "FAILED", "CANCELLED"];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const orders = await serverGet<Order[]>(`/api/admin/orders${status ? `?status=${status}` : ""}`);

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !status ? "bg-primary text-white" : "bg-white text-foreground hover:bg-primary-light"
          }`}
        >
          All
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              status === s ? "bg-primary text-white" : "bg-white text-foreground hover:bg-primary-light"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-black/[.06] bg-white">
        {!orders || orders.length === 0 ? (
          <p className="p-4 text-sm text-zinc-500">No orders found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[.06] text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-black/[.06] last:border-0">
                  <td className="p-4">
                    <Link href={`/admin/orders/${order.id}`} className="font-medium hover:text-primary">
                      {orderRef(order.id)}
                    </Link>
                  </td>
                  <td className="p-4 text-zinc-500">{order.customerName}</td>
                  <td className="p-4 text-zinc-500">{formatDate(order.createdAt)}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-primary-light px-2 py-1 text-xs font-semibold text-primary">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-semibold">{formatPrice(order.totalCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
