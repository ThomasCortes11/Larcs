import type { Metadata } from "next";

import { BrandIdentity } from "@/components/home/brand-identity";
import { BRAND_IDENTITY_CONTENT } from "@/lib/brand-content";

export const metadata: Metadata = {
  title: {
    absolute: "Sobre nosotros | Más de 30 años creando calzado con historia"
  },
  description: BRAND_IDENTITY_CONTENT.paragraphs[0]
};

export default function NosotrosPage() {
  return <BrandIdentity headingLevel="h1" />;
}
