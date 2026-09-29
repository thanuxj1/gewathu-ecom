import { Router } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma, prismaDirect } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { sendAdminNewOrderEmail, sendOrderConfirmationEmail } from "../lib/email.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { generateCheckoutHash, payhereConfigured, payhereMerchantId, payhereSandbox } from "../lib/payhere.js";

export const ordersRouter = Router();

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7),
  shippingAddress: z.string().min(1),
  city: z.string().min(1),
  notes: z.string().optional(),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER", "PAYHERE"]).default("COD"),
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

  if (data.paymentMethod === "PAYHERE" && !payhereConfigured) {
    return res.status(400).json({ error: "Online payment isn't set up yet — please choose Cash on delivery." });
  }

  try {
    const order = await prismaDirect.$transaction(async (tx) => {
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

      const created = await tx.order.create({
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

      if (data.paymentMethod === "PAYHERE") {
        await tx.payment.create({
          data: {
            orderId: created.id,
            provider: "payhere",
            status: "PENDING",
            amountCents: totalCents,
          },
        });
      }

      return created;
    }, { timeout: 20000, maxWait: 15000 });

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

    const payhere =
      order.paymentMethod === "PAYHERE"
        ? {
            merchantId: payhereMerchantId,
            hash: generateCheckoutHash(order.id, order.totalCents),
            sandbox: payhereSandbox,
            notifyUrl: process.env.PAYHERE_NOTIFY_URL ?? "",
            currency: "LKR" as const,
          }
        : undefined;

    res.status(201).json({ ...order, payhere });
  } catch (error) {
    // Transient DB/connection failures (Neon cold start, pool exhaustion, etc.)
    // throw Prisma's own error classes with internal-sounding messages — never
    // show those verbatim to the customer. Our own intentional validation
    // errors (stock, missing products) are plain `Error`s and are safe to show.
    const isInfraError =
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientRustPanicError ||
      error instanceof Prisma.PrismaClientInitializationError;

    if (isInfraError) {
      console.error("Order creation database error:", error);
      return res.status(503).json({ error: "We couldn't reach the database just now. Please try again in a moment." });
    }

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
