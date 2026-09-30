import crypto from "crypto";

const MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID ?? "";
const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET ?? "";
const MODE = process.env.PAYHERE_MODE ?? "sandbox";

export const payhereConfigured = Boolean(MERCHANT_ID && MERCHANT_SECRET);
export const payhereMerchantId = MERCHANT_ID;
export const payhereSandbox = MODE !== "live";

function md5Upper(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex").toUpperCase();
}

function formatAmount(amountCents: number): string {
  return (amountCents / 100).toFixed(2);
}

// PayHere checkout hash: UPPER(MD5(merchant_id + order_id + amount + currency + UPPER(MD5(secret))))
// Must only ever be computed server-side — never expose merchant_secret to the client.
export function generateCheckoutHash(orderId: string, amountCents: number, currency = "LKR"): string {
  const secretHash = md5Upper(MERCHANT_SECRET);
  return md5Upper(`${MERCHANT_ID}${orderId}${formatAmount(amountCents)}${currency}${secretHash}`);
}

export function verifyNotifySignature(params: {
  merchant_id: string;
  order_id: string;
  payhere_amount: string;
  payhere_currency: string;
  status_code: string;
  md5sig: string;
}): boolean {
  if (params.merchant_id !== MERCHANT_ID) return false;
  const secretHash = md5Upper(MERCHANT_SECRET);
  const expected = md5Upper(
    `${params.merchant_id}${params.order_id}${params.payhere_amount}${params.payhere_currency}${params.status_code}${secretHash}`
  );
  return expected === params.md5sig.toUpperCase();
}
