import Link from "next/link";
import type { Category } from "@/lib/types";
import { getCategoryTheme } from "@/lib/category-theme";

export function CategoryCard({ category }: { category: Category }) {
  const theme = getCategoryTheme(category.slug);
  const Icon = theme.icon;

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-[13px] border p-[18px] text-center transition hover:-translate-y-0.5"
      style={{ borderColor: "var(--color-border)", background: "#fff" }}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: theme.bg, color: theme.iconColor }}
      >
        <Icon size={24} strokeWidth={2} />
      </span>
      <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>
        {category.name}
      </span>
      {category.description && <span className="text-xs text-zinc-500">{category.description}</span>}
    </Link>
  );
}
