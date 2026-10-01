import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "accent" | "primary";
type ButtonSize = "md" | "sm";

const variants: Record<ButtonVariant, string> = {
  accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
  primary: "bg-primary text-on-deep hover:bg-primary-hover",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-[50px] gap-2 px-6 text-sm",
  sm: "h-10 gap-1.5 px-3.5 text-sm",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  variant = "accent",
  size = "md",
  className = "",
  href,
  ariaLabel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-button font-extrabold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
