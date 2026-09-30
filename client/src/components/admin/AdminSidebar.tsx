"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image as ImageIcon,
  LayoutDashboard,
  ListTree,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { api } from "@/lib/api";

const MAIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: ListTree },
];

const CONTENT_LINKS = [
  { href: "/admin/content/hero-slides", label: "Hero Slides", icon: ImageIcon },
  { href: "/admin/content/trust-badges", label: "Trust Badges", icon: SlidersHorizontal },
  { href: "/admin/content/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/content/guide-cards", label: "Guide Cards", icon: ListTree },
  { href: "/admin/content/settings", label: "Site Settings", icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  function isActive(href: string) {
    return pathname === href || (href !== "/admin" && pathname.startsWith(href));
  }

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
      {MAIN_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive(link.href) ? "bg-primary text-white" : "text-foreground hover:bg-primary-light"
            }`}
          >
            <Icon size={16} />
            {link.label}
          </Link>
        );
      })}

      <p className="mt-5 mb-1 px-3 text-xs font-bold uppercase tracking-wide text-zinc-400">Content</p>
      {CONTENT_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive(link.href) ? "bg-primary text-white" : "text-foreground hover:bg-primary-light"
            }`}
          >
            <Icon size={16} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleLogout() {
    await api.post("/api/auth/logout");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="flex items-center justify-between border-b p-4 lg:hidden"
        style={{ borderColor: "var(--color-border)", background: "#fff" }}
      >
        <Link href="/admin" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Gewathu.lk" className="h-9 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ color: "var(--color-primary)" }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col p-5 lg:hidden"
              style={{ background: "#fff" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Gewathu.lk" className="h-10 w-auto" />
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <p className="mt-1 text-xs text-zinc-500">Admin dashboard</p>
              <div className="mt-6 flex-1 overflow-y-auto">
                <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
              </div>
              <div className="border-t border-black/[.06] pt-4 text-xs">
                <p className="truncate text-zinc-500">{userName}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600 hover:underline"
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r p-5 lg:flex"
        style={{ borderColor: "var(--color-border)", background: "#fff" }}
      >
        <Link href="/admin" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Gewathu.lk" className="h-12 w-auto" />
        </Link>
        <p className="mt-1 text-xs text-zinc-500">Admin dashboard</p>

        <div className="mt-8 flex flex-1 flex-col overflow-y-auto">
          <NavLinks pathname={pathname} />
        </div>

        <div className="border-t border-black/[.06] pt-4 text-xs">
          <p className="truncate text-zinc-500">{userName}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600 hover:underline"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>
    </>
  );
}
