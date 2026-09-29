"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminAnalytics } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  PAID: "#16a34a",
  SHIPPED: "#0284c7",
  DELIVERED: "#166534",
  FAILED: "#dc2626",
  CANCELLED: "#71717a",
};

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-LK", { month: "short", day: "numeric" });
}

export function AnalyticsCharts({ analytics }: { analytics: AdminAnalytics }) {
  const revenueData = analytics.revenueTrend.map((d) => ({ ...d, label: shortDate(d.date), rupees: d.totalCents / 100 }));
  const statusData = analytics.statusBreakdown.map((s) => ({ ...s }));

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Revenue — last 30 days</h2>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={4} />
              <YAxis tick={{ fontSize: 11 }} width={40} />
              <Tooltip formatter={(value) => formatPrice(Number(value) * 100)} />
              <Line type="monotone" dataKey="rupees" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-black/[.06] bg-white p-5">
        <h2 className="font-semibold">Orders by status</h2>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="status" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={30} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusData.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "var(--color-primary)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-black/[.06] bg-white p-5 lg:col-span-2">
        <h2 className="font-semibold">Top products</h2>
        {analytics.topProducts.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No sales data yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-black/[.06]">
            {analytics.topProducts.map((p, i) => (
              <li key={p.productId} className="flex items-center justify-between py-2.5 text-sm">
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {p.name}
                </span>
                <span className="font-semibold text-zinc-600">{p.quantitySold} sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
