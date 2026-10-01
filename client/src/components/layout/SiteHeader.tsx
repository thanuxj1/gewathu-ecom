"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { navigation } from "@/features/home/home-content";
import { useCart } from "@/lib/cart-context";
import { api } from "@/lib/api";
import type { SessionUser } from "@/lib/types";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [session, setSession] = useState<SessionUser | null | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    api
      .get<SessionUser>("/api/auth/me")
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function focusSearch() {
    if (pathname === "/") {
      document.getElementById("site-search")?.focus();
    } else {
      router.push("/shop");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="shell-wide flex h-[70px] items-center gap-1.5 min-[681px]:h-[82px] min-[681px]:gap-7">
        <Link href="/" className="shrink-0" aria-label="Gewathu.lk home">
          <BrandMark priority compact />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 min-[961px]:flex" aria-label="Primary">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-[3px] py-7 text-[0.94rem] font-bold ${
                  active
                    ? "border-accent text-primary"
                    : "border-transparent hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 min-[961px]:ml-0">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-deep hover:bg-surface-muted"
            aria-label="Search"
            onClick={focusSearch}
          >
            <Icon name="search" className="h-5 w-5" />
          </button>
          <Link
            href={session ? "/account/orders" : "/login"}
            className="hidden h-11 w-11 items-center justify-center rounded-full text-deep hover:bg-surface-muted min-[681px]:inline-flex"
            aria-label={session ? "My account" : "Login"}
          >
            <Icon name="user" className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 font-extrabold text-accent-foreground max-[680px]:w-11 max-[680px]:px-0"
            aria-label="Cart"
          >
            <Icon name="cart" className="h-5 w-5" />
            <span className="max-[680px]:sr-only">Cart</span>
            {count > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-[0.7rem] font-extrabold text-on-deep">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-deep hover:bg-surface-muted min-[961px]:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 min-[961px]:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-shade/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside
            id={menuId}
            className="absolute inset-y-0 right-0 flex w-[min(360px,92vw)] flex-col bg-surface px-7 py-7 shadow-card"
          >
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center self-end rounded-full"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
            <div className="mt-6">
              <BrandMark />
            </div>
            <nav className="mt-6 flex flex-col" aria-label="Mobile">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-4 font-extrabold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={session ? "/account/orders" : "/login"}
                className="border-b border-border py-4 font-extrabold"
                onClick={() => setOpen(false)}
              >
                {session ? "My orders" : "Login"}
              </Link>
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
