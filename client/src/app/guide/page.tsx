import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "Gardening Guide",
  description: "Practical gardening advice for Sri Lankan homes, from Gewathu.lk.",
};

export default function GuidePage() {
  return (
    <PlaceholderPage
      title="Gardening Guide"
      message="Full gardening guides will be published in a later milestone."
    />
  );
}
