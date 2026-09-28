import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { requireAdmin } from "../../middleware/auth.js";
import { sendOrderStatusEmail } from "../../lib/email.js";
import { asyncHandler } from "../../lib/asyncHandler.js";

export const adminOrdersRouter = Router();
adminOrdersRouter.use(requireAdmin);

adminOrdersRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const orders = await prisma.order.findMany({
      where: status ? { status: status as never } : undefined,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  })
);

adminOrdersRouter.get(
  "/stats",
  asyncHandler(async (_req, res) => {
    const [totalOrders, pending, revenue] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.aggregate({
        _sum: { totalCents: true },
        where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      }),
    ]);
    res.json({
      totalOrders,
      pending,
      revenueCents: revenue._sum.totalCents ?? 0,
    });
  })
);

const statusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "FAILED", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

adminOrdersRouter.patch(
  "/:id/status",
  asyncHandler<{ id: string }>(async (req, res) => {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid status" });

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
      include: { items: { include: { product: true } } },
    });

    void sendOrderStatusEmail({
      id: order.id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalCents: order.totalCents,
      status: order.status,
      items: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        priceCents: item.priceCents,
      })),
    });

    res.json(order);
  })
);
