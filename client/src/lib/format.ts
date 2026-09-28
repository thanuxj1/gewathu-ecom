export function formatPrice(cents: number): string {
  return `Rs. ${(cents / 100).toLocaleString("en-LK", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-LK", { year: "numeric", month: "short", day: "numeric" });
}

export function orderRef(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}
