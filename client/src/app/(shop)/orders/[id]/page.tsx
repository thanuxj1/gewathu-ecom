import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { Order } from "@/lib/types";
import { formatDate, formatPrice, orderRef } from "@/lib/format";

async function getOrder(id: string): Promise<Order | null> {
  try {
    return await api.get<Order>(`/api/orders/${id}`);
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

const STATUS_LABEL: Record<Order["status"], string> = {
  PENDING: "Pending confirmation",
  PAID: "Paid",
  FAILED: "Payment failed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <CheckCircle2 className="mx-auto text-primary" size={48} />
        <h1 className="mt-4 text-2xl sm:text-3xl" style={{ color: "var(--color-primary)" }}>
          Thank you, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Your order {orderRef(order.id)} was placed on {formatDate(order.createdAt)}.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-black/[.06] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Order {orderRef(order.id)}</h2>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        <div className="mt-4 space-y-3 divide-y divide-black/[.06]">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between pt-3 text-sm first:pt-0">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium">{formatPrice(item.priceCents * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between border-t border-black/[.06] pt-4 text-sm font-bold">
          <span>Total</span>
          <span>{formatPrice(order.totalCents)}</span>
        </div>

        <div className="mt-6 grid gap-1 text-sm text-zinc-600">
          <p><strong>Deliver to:</strong> {order.shippingAddress}, {order.city}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Payment:</strong> {order.paymentMethod === "COD" ? "Cash on delivery" : "Bank transfer"}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/shop" className="text-sm font-medium text-primary underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
