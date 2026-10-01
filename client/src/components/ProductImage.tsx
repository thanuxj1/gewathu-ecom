import { getCategoryTheme } from "@/lib/category-theme";

export function ProductImage({
  imageUrl,
  name,
  categorySlug,
  className = "",
}: {
  imageUrl?: string | null;
  name: string;
  categorySlug?: string;
  className?: string;
}) {
  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={name} className={`object-cover ${className}`} />;
  }

  const theme = getCategoryTheme(categorySlug ?? "plants");

  if (theme.spriteIndex === null) {
    const ThemeIcon = theme.icon;
    return (
      <div
        className={`relative grid place-items-center ${className}`}
        style={{ backgroundColor: theme.bg }}
        aria-hidden
      >
        <ThemeIcon className="h-12 w-12" style={{ color: theme.iconColor }} />
      </div>
    );
  }

  return (
    <div
      className={`sprite-photo sprite-${theme.spriteIndex} relative ${className}`}
      style={{ backgroundColor: theme.bg }}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: `${theme.bg}55` }} />
    </div>
  );
}
