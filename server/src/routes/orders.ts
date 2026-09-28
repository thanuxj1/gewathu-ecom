import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { sendAdminNewOrderEmail, sendOrderConfirmationEmail } from "../lib/email.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const ordersRouter = Router();

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  shippingAddress: z.string().min(1),
  city: z.string().min(1),
  notes: z.string().optional(),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER"]).default("COD"),
  items: z
    .array(z.object({ productId: z.string(), quantity: z.number().int().positive() }))
    .min(1),
});

ordersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid order" });
  }
  const data = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const productIds = data.items.map((item) => item.productId);
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });

      if (products.length !== productIds.length) {
        throw new Error("One or more products no longer exist");
      }

      let totalCents = 0;
      const orderItemsData = data.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }
        totalCents += product.priceCents * item.quantity;
        return {
          productId: product.id,
          quantity: item.quantity,
          priceCents: product.priceCents,
        };
      });

      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const userId = req.session?.userId;

      return tx.order.create({
        data: {
          userId: userId ?? undefined,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          shippingAddress: data.shippingAddress,
          city: data.city,
          notes: data.notes,
          paymentMethod: data.paymentMethod,
          totalCents,
          items: { create: orderItemsData },
        },
        include: { items: { include: { product: true } } },
      });
    }, { timeout: 20000 });

    const emailData = {
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
    };
    void sendOrderConfirmationEmail(emailData);
    void sendAdminNewOrderEmail(emailData);

    res.status(201).json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not place order";
    res.status(400).json({ error: message });
  }
  })
);

ordersRouter.get(
  "/mine",
  requireAuth,
  asyncHandler(async (req, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.session!.userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  })
);

ordersRouter.get(
  "/:id",
  asyncHandler<{ id: string }>(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } } },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  })
);
