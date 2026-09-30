import { notFound } from "next/navigation";
import { serverGet } from "@/lib/server-api";
import type { Order } from "@/lib/types";
import { formatDate, formatPrice, orderRef, paymentMethodLabel } from "@/lib/format";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await serverGet<Order>(`/api/orders/${id}`);

  if (!order) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Order {orderRef(order.id)}</h1>
      <p className="text-sm text-zinc-500">Placed {formatDate(order.createdAt)}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-black/[.06] bg-white p-5">
          <h2 className="font-semibold">Items</h2>
          <div className="mt-3 divide-y divide-black/[.06]">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.priceCents * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-black/[.06] pt-3 text-sm font-bold">
            <span>Total</span>
            <span>{formatPrice(order.totalCents)}</span>
          </div>

          <h2 className="mt-6 font-semibold">Update status</h2>
          <div className="mt-3">
            <OrderStatusForm orderId={order.id} currentStatus={order.status} />
          </div>
        </div>

        <div className="rounded-xl border border-black/[.06] bg-white p-5">
          <h2 className="font-semibold">Customer</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-zinc-500">Name</dt>
              <dd className="font-medium">{order.customerName}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="font-medium">{order.customerEmail}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Phone</dt>
              <dd className="font-medium">{order.customerPhone}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Delivery address</dt>
              <dd className="font-medium">{order.shippingAddress}, {order.city}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Payment method</dt>
              <dd className="font-medium">{paymentMethodLabel(order.paymentMethod)}</dd>
            </div>
            {order.notes && (
              <div>
                <dt className="text-zinc-500">Notes</dt>
                <dd className="font-medium">{order.notes}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
