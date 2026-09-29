import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminAnalyticsRouter = Router();
adminAnalyticsRouter.use(requireAdmin);

const REVENUE_STATUSES = ["PAID", "SHIPPED", "DELIVERED"] as const;

adminAnalyticsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [recentOrders, statusCounts, topItems] = await Promise.all([
      prisma.order.findMany({
        where: { status: { in: [...REVENUE_STATUSES] }, createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true, totalCents: true },
      }),
      prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
    ]);

    // Build a fixed 30-day series (including zero-revenue days) so the chart
    // doesn't have gaps for days with no orders.
    const revenueByDay = new Map<string, number>();
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      revenueByDay.set(d.toISOString().slice(0, 10), 0);
    }
    for (const order of recentOrders) {
      const key = order.createdAt.toISOString().slice(0, 10);
      revenueByDay.set(key, (revenueByDay.get(key) ?? 0) + order.totalCents);
    }
    const revenueTrend = Array.from(revenueByDay.entries()).map(([date, totalCents]) => ({ date, totalCents }));

    const products = await prisma.product.findMany({
      where: { id: { in: topItems.map((t) => t.productId) } },
      select: { id: true, name: true },
    });
    const productNameById = new Map(products.map((p) => [p.id, p.name]));
    const topProducts = topItems.map((t) => ({
      productId: t.productId,
      name: productNameById.get(t.productId) ?? "Unknown product",
      quantitySold: t._sum.quantity ?? 0,
    }));

    const statusBreakdown = statusCounts.map((s) => ({ status: s.status, count: s._count._all }));

    res.json({ revenueTrend, statusBreakdown, topProducts });
  })
);
