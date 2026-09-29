import {
  Award,
  BadgeCheck,
  Clock,
  CreditCard,
  Gift,
  Headphones,
  Heart,
  Leaf,
  Package,
  ShieldCheck,
  Star,
  ThumbsUp,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Truck,
  BadgeCheck,
  ShieldCheck,
  Headphones,
  Leaf,
  Heart,
  Star,
  Clock,
  Award,
  ThumbsUp,
  Package,
  CreditCard,
  Gift,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Truck;
}
