const rupeeFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** Formats a display price in Sri Lankan rupees. Home content uses whole rupees, not database cents. */
export function formatLkr(rupees: number): string {
  return `Rs. ${rupeeFormat.format(rupees)}`;
}

export function formatPrice(cents: number): string {
  return `Rs. ${(cents / 100).toLocaleString("en-LK", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" });
}

export function orderRef(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  COD: "Cash on delivery",
  BANK_TRANSFER: "Bank transfer",
  PAYHERE: "Paid online (PayHere)",
};

export function paymentMethodLabel(method: string): string {
  return PAYMENT_METHOD_LABEL[method] ?? method;
}
