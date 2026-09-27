import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "About Gewathu.lk and how to get in touch.",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About & Contact"
      message="The full About and Contact page will be added in a later milestone."
    />
  );
}
