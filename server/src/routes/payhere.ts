import { Router } from "express";
import express from "express";
import { prisma, prismaDirect } from "../lib/prisma.js";
import { payhereConfigured, payhereSandbox, verifyNotifySignature } from "../lib/payhere.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { sendOrderStatusEmail } from "../lib/email.js";

export const payhereRouter = Router();

payhereRouter.get("/config", (_req, res) => {
  res.json({ enabled: payhereConfigured, sandbox: payhereSandbox });
});

// PayHere calls this server-to-server with a form-encoded body — never from
// the browser, so it needs its own body parser (the app only parses JSON).
payhereRouter.post(
  "/notify",
  express.urlencoded({ extended: false }),
  asyncHandler(async (req, res) => {
    const body = req.body as Record<string, string>;
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig, payment_id } = body;

    if (!merchant_id || !order_id || !payhere_amount || !payhere_currency || !status_code || !md5sig) {
      return res.status(400).send("Missing fields");
    }

    const valid = verifyNotifySignature({ merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig });
    if (!valid) return res.status(400).send("Invalid signature");

    const payment = await prisma.payment.findUnique({ where: { orderId: order_id } });
    if (!payment) return res.status(404).send("Unknown order");

    const success = status_code === "2";
    const failed = status_code === "-1" || status_code === "-2" || status_code === "-3";

    const order = await prismaDirect.$transaction(async (tx) => {
      await tx.payment.update({
        where: { orderId: order_id },
        data: {
          status: success ? "SUCCEEDED" : failed ? "FAILED" : "PENDING",
          reference: payment_id || undefined,
        },
      });
      return tx.order.update({
        where: { id: order_id },
        data: { status: success ? "PAID" : failed ? "FAILED" : "PENDING" },
        include: { items: { include: { product: true } } },
      });
    });

    if (success) {
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
    }

    res.status(200).send("OK");
  })
);
