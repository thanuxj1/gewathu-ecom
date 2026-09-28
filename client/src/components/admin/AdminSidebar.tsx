"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ListTree, LogOut, Package, ShoppingBag } from "lucide-react";
import { api } from "@/lib/api";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: ListTree },
];

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await api.post("/api/auth/logout");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r p-5" style={{ borderColor: "var(--color-border)", background: "#fff" }}>
      <Link href="/admin" className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Gewathu.lk" className="h-12 w-auto" />
      </Link>
      <p className="mt-1 text-xs text-zinc-500">Admin dashboard</p>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {LINKS.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active ? "bg-primary text-white" : "text-foreground hover:bg-primary-light"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

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
  );
}
