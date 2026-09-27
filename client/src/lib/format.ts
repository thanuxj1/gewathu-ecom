const rupeeFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** Formats a display price in Sri Lankan rupees. Home content uses whole rupees, not database cents. */
export function formatLkr(rupees: number): string {
  return `Rs. ${rupeeFormat.format(rupees)}`;
}
