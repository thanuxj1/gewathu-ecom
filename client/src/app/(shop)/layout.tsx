import Script from "next/script";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { serverGet } from "@/lib/server-api";
import type { HomepageContent, SiteSettings } from "@/lib/types";

async function getSettings(): Promise<SiteSettings | null> {
  const content = await serverGet<HomepageContent>("/api/homepage");
  return content?.settings ?? null;
}

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <CartProvider>
      <Script src="https://www.payhere.lk/lib/payhere.js" strategy="afterInteractive" />
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </CartProvider>
  );
}
