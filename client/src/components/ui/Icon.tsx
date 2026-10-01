import type { SVGProps } from "react";

export const iconNames = [
  "arrow",
  "badge",
  "book",
  "cart",
  "chevron",
  "close",
  "droplets",
  "flower",
  "headphones",
  "leaf",
  "menu",
  "message",
  "package",
  "search",
  "shield",
  "shovel",
  "sprout",
  "star",
  "truck",
  "user",
] as const;

export type IconName = (typeof iconNames)[number];

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, string> = {
  arrow: "M5 12h14M12 5l7 7-7 7",
  badge:
    "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76ZM9 12l2 2 4-4",
  book: "M12 5v16M20 19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a5 5 0 0 0-4 2 5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4a5 5 0 0 1 4 2 5 5 0 0 1 4-2z",
  cart: "M2 3h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 8H6M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  chevron: "m9 18 6-6-6-6",
  close: "M18 6 6 18M6 6l12 12",
  droplets:
    "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05zM12.56 6.6A11 11 0 0 0 14 3c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a7 7 0 0 1-8.44-8.4",
  flower:
    "M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM19 9a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM12 10v12M12 22c4 0 6-1.5 6-4.5S16 13 12 13s-6 1.5-6 4.5S8 22 12 22Z",
  headphones:
    "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10ZM2 21c0-3 1.8-5.4 5.1-6C9.5 14.5 12 13 13 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  message:
    "M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.2-3.6A8 8 0 1 1 21 12Z",
  package:
    "M12 22V12M3.3 7 12 12l8.7-5M12 22 3.3 17V7L12 2l8.7 5v10L12 22Z",
  search: "m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  shield:
    "M12 22c4-1.5 7-4 7-9V6l-7-3-7 3v7c0 5 3 7.5 7 9ZM9 12l2 2 4-4",
  shovel: "M14 8 6 16l-2 5 5-2 8-8M15 5l4 4M14 4l6 6",
  sprout: "M12 22V12M7 12a5 5 0 0 1 5-5 5 5 0 0 1 5 5M12 7V4h4M5 22h14",
  star: "m12 3 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8 6.9 18.7l1-5.7-4.1-4 5.7-.8L12 3Z",
  truck:
    "M3 7h11v10H3V7ZM14 10h4l3 3v4h-7v-7ZM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
};

export function Icon({ name, className, ...props }: IconProps) {
  const filled = name === "star";

  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
