import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "Gewathu.lk <onboarding@resend.dev>";
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL ?? "admin@gewathu.lk";

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.log(`[email:skipped, no RESEND_API_KEY] to=${to} subject="${subject}"`);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (error) {
    console.error(`[email:failed] to=${to} subject="${subject}"`, error);
  }
}

function money(cents: number) {
  return `Rs. ${(cents / 100).toLocaleString("en-LK", { minimumFractionDigits: 2 })}`;
}

type OrderEmailItem = { name: string; quantity: number; priceCents: number };
type OrderEmailData = {
  id: string;
  customerName: string;
  customerEmail: string;
  totalCents: number;
  items: OrderEmailItem[];
  status: string;
};

function itemsTable(items: OrderEmailItem[]) {
  const rows = items
    .map(
      (item) =>
        `<tr><td style="padding:4px 8px">${item.name}</td><td style="padding:4px 8px">x${item.quantity}</td><td style="padding:4px 8px">${money(item.priceCents * item.quantity)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%">${rows}</table>`;
}

export async function sendOrderConfirmationEmail(order: OrderEmailData) {
  const html = `
    <div style="font-family:sans-serif">
      <h2 style="color:#1f6b3a">Thanks for your order, ${order.customerName}!</h2>
      <p>We've received your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> and will get it ready soon.</p>
      ${itemsTable(order.items)}
      <p style="margin-top:12px"><strong>Total: ${money(order.totalCents)}</strong></p>
      <p>We'll email you again when your order status changes.</p>
      <p>— Gewathu.lk</p>
    </div>`;
  await send(order.customerEmail, `Order confirmed — #${order.id.slice(-8).toUpperCase()}`, html);
}

export async function sendAdminNewOrderEmail(order: OrderEmailData) {
  const html = `
    <div style="font-family:sans-serif">
      <h2>New order #${order.id.slice(-8).toUpperCase()}</h2>
      <p>From ${order.customerName} (${order.customerEmail})</p>
      ${itemsTable(order.items)}
      <p><strong>Total: ${money(order.totalCents)}</strong></p>
      <p><a href="${process.env.CLIENT_ORIGIN ?? ""}/admin/orders/${order.id}">View in admin dashboard</a></p>
    </div>`;
  await send(ADMIN_NOTIFY_EMAIL, `New order — #${order.id.slice(-8).toUpperCase()}`, html);
}

export async function sendOrderStatusEmail(order: OrderEmailData) {
  const html = `
    <div style="font-family:sans-serif">
      <h2 style="color:#1f6b3a">Order update</h2>
      <p>Hi ${order.customerName}, your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> is now:</p>
      <p style="font-size:18px;font-weight:bold;text-transform:capitalize">${order.status.toLowerCase()}</p>
      <p>— Gewathu.lk</p>
    </div>`;
  await send(order.customerEmail, `Order update — #${order.id.slice(-8).toUpperCase()}`, html);
}
