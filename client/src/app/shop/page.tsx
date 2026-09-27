import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse plants, seeds, tools and garden supplies from Gewathu.lk.",
};

export default function ShopPage() {
  return (
    <PlaceholderPage
      title="Shop"
      message="The product catalogue, categories, search and filters will be built in a later milestone."
    />
  );
}
