import Image from "next/image";
import Link from "next/link";

import { BRAND_LOGO_BW, BRAND_LOGO_PURPLE, BRAND_NAME } from "@/lib/constants";

interface BrandLogoProps {
  href?: string;
  variant?: "purple" | "bw";
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function BrandLogo({
  href = "/",
  variant = "purple",
  width = 120,
  height = 34,
  priority,
  className
}: BrandLogoProps) {
  const src = variant === "bw" ? BRAND_LOGO_BW : BRAND_LOGO_PURPLE;

  return (
    <Link href={href} className={className} aria-label={`Ir a inicio ${BRAND_NAME}`}>
      <Image src={src} alt={`Logo ${BRAND_NAME}`} width={width} height={height} priority={priority} />
    </Link>
  );
}