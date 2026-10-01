import Image from "next/image";
import { brand } from "@/features/home/home-content";
import { Icon } from "@/components/ui/Icon";

type BrandMarkProps = {
  priority?: boolean;
  framed?: boolean;
  /** Constrain by height instead of width — for tight, fixed-height bars like the sticky header. */
  compact?: boolean;
};

export function BrandMark({ priority = false, framed = false, compact = false }: BrandMarkProps) {
  const frame = framed ? "rounded-lg bg-surface px-3 py-2" : "";
  const size = compact ? "h-11 w-auto min-[681px]:h-[52px]" : "h-auto w-[118px] min-[681px]:w-[150px]";

  if (brand.logoSrc) {
    return (
      <Image
        src={brand.logoSrc}
        alt="Gewathu.lk"
        width={170}
        height={72}
        priority={priority}
        className={`${size} ${frame}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 text-deep ${frame}`}>
      <Icon name="leaf" className="h-6 w-6 text-primary" />
      <span className="text-base font-extrabold tracking-tight min-[400px]:text-xl">
        Gewathu
        <span className="text-primary">.lk</span>
      </span>
    </span>
  );
}
