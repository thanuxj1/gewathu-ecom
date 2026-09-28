"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { api } from "@/lib/api";
import type { SessionUser } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#guide", label: "Gardening Guide" },
  { href: "/#contact", label: "About & Contact" },
];

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    api
      .get<SessionUser>("/api/auth/me")
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  return (
    <header className="sticky top-0 z-40 overflow-visible bg-white/95 backdrop-blur">
      <div className="px-4 py-1.5 text-center text-[11px] font-medium text-white" style={{ background: "var(--color-primary)" }}>
        Free delivery in selected areas for orders above Rs. 5,000
      </div>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Gewathu.lk home" className="relative z-10 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Gewathu.lk" className="h-10 w-auto sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="border-b-2 pb-1 transition hover:opacity-70"
                style={{
                  color: active ? "var(--color-add)" : "var(--foreground)",
                  borderColor: active ? "var(--color-accent)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/shop"
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 sm:flex"
            style={{ color: "var(--color-primary)" }}
          >
            <Search size={17} />
          </Link>
          <Link
            href={session ? "/account/orders" : "/login"}
            aria-label="Account"
            className="hidden h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 sm:flex"
            style={{ color: "var(--color-primary)" }}
          >
            <User size={17} />
          </Link>
          <Link
            href="/cart"
            className="relative ml-1 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-[#222]"
            style={{ background: "var(--color-accent)" }}
          >
            <ShoppingCart size={16} />
            Cart
            {count > 0 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: "var(--color-primary-dark)" }}
              >
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 lg:hidden"
            style={{ color: "var(--color-primary)" }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t px-4 py-4 lg:hidden" style={{ borderColor: "var(--color-border)" }}>
          <nav className="flex flex-col gap-3 text-sm font-bold">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: active ? "var(--color-add)" : "var(--foreground)" }}
                >
                  {link.label}
                </Link>
              );
            })}
            {session ? (
              <Link href="/account/orders" onClick={() => setMenuOpen(false)} style={{ color: "var(--foreground)" }}>
                My orders
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ color: "var(--foreground)" }}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
