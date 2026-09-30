import { Droplets, Flower, Leaf, PackageOpen, Shovel, Sprout, type LucideIcon } from "lucide-react";

export type CategoryVariant = "mint" | "lime" | "clay" | "soil" | "sun" | "water";

type Theme = { variant: CategoryVariant; icon: LucideIcon; bg: string; iconColor: string; spriteIndex: 1 | 2 | 3 | 4 };

export const CATEGORY_THEME: Record<string, Theme> = {
  plants: { variant: "mint", icon: Leaf, bg: "#e1f3e3", iconColor: "#2f7a36", spriteIndex: 4 },
  "seeds-seedlings": { variant: "lime", icon: Sprout, bg: "#edf5d3", iconColor: "#56830d", spriteIndex: 2 },
  "pots-planters": { variant: "clay", icon: Flower, bg: "#f4e5da", iconColor: "#a45b30", spriteIndex: 4 },
  "soil-fertilizers": { variant: "soil", icon: PackageOpen, bg: "#eee1d5", iconColor: "#70401c", spriteIndex: 1 },
  "garden-tools": { variant: "sun", icon: Shovel, bg: "#fff1c8", iconColor: "#9a6a00", spriteIndex: 3 },
  "watering-irrigation": { variant: "water", icon: Droplets, bg: "#dff1f7", iconColor: "#247397", spriteIndex: 3 },
};

export const DEFAULT_THEME: Theme = CATEGORY_THEME.plants;

export function getCategoryTheme(slug: string): Theme {
  return CATEGORY_THEME[slug] ?? DEFAULT_THEME;
}
