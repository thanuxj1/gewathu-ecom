import Link from "next/link";
import { serverGet } from "@/lib/server-api";
import type { Order } from "@/lib/types";
import { formatDate, formatPrice, orderRef } from "@/lib/format";

type Stats = { totalOrders: number; pending: number; revenueCents: number };

export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    serverGet<Stats>("/api/admin/orders/stats"),
    serverGet<Order[]>("/api/admin/orders"),
  ]);

  const recent = (orders ?? []).slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders" value={String(stats?.totalOrders ?? 0)} />
        <StatCard label="Pending orders" value={String(stats?.pending ?? 0)} />
        <StatCard label="Revenue (paid+)" value={formatPrice(stats?.revenueCents ?? 0)} />
      </div>

      <div className="mt-8 rounded-xl border border-black/[.06] bg-white">
        <div className="flex items-center justify-between border-b border-black/[.06] p-4">
          <h2 className="font-semibold">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="p-4 text-sm text-zinc-500">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {recent.map((order) => (
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/[.06] bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
