import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="mt-16 scroll-mt-20 text-white" style={{ background: "var(--color-footer)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:px-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="inline-block rounded-xl bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Gewathu.lk" className="h-24 w-auto" />
          </div>
          <p className="mt-4 text-sm text-emerald-50">
            Your local online destination for plants, seeds, tools and everything needed to grow at home.
          </p>
          <a
            href="https://wa.me/94"
            className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold"
            style={{ color: "var(--color-accent)" }}
          >
            <MessageCircle size={16} /> WhatsApp us
          </a>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-200">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            <li><Link href="/shop?category=plants" className="hover:text-white">Plants</Link></li>
            <li><Link href="/shop?category=seeds-seedlings" className="hover:text-white">Seeds & seedlings</Link></li>
            <li><Link href="/shop?category=garden-tools" className="hover:text-white">Tools & equipment</Link></li>
            <li><Link href="/shop?category=soil-fertilizers" className="hover:text-white">Soil & fertilizers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-200">Help</h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            <li><Link href="/#guide" className="hover:text-white">Gardening Guide</Link></li>
            <li><Link href="/account/orders" className="hover:text-white">Track an order</Link></li>
            <li><Link href="/cart" className="hover:text-white">Your cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-200">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-50">
            <li className="flex items-center gap-2"><MessageCircle size={14} /> WhatsApp: +94 XX XXX XXXX</li>
            <li className="flex items-center gap-2"><Mail size={14} /> hello@gewathu.lk</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Sri Lanka</li>
          </ul>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-emerald-100" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        © {new Date().getFullYear()} Gewathu.lk. All rights reserved.
      </div>
    </footer>
  );
}
