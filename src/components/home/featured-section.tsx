import Link from "next/link";

import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/types/product";

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 md:px-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Colección destacada</p>
          <h2 className="brand-display mt-2 text-3xl">Best Sellers</h2>
        </div>
        <Link href="/catalogo">
          <Button variant="secondary">Ver catálogo completo</Button>
        </Link>
      </Reveal>
      <ProductGrid products={products.slice(0, 8)} wide />
    </section>
  );
}
