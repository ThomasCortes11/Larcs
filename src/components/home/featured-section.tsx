import Link from "next/link";

import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-14 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Coleccion destacada</p>
          <h2 className="brand-display mt-2 text-3xl">Best Sellers</h2>
        </div>
        <Link href="/catalogo">
          <Button variant="secondary">Ver catalogo completo</Button>
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 12)} />
    </section>
  );
}
