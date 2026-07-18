import Link from "next/link";

import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { CategoryKey, Product } from "@/types/product";

interface CategorySectionsProps {
  products: Product[];
}

const orderedCategories: CategoryKey[] = ["botas", "botines", "tacones", "sandalias", "mocasines"];

export function CategorySections({ products }: CategorySectionsProps) {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-4 md:px-6">
      {orderedCategories.map((category) => {
        const items = products.filter((product) => product.category === category);
        if (items.length === 0) return null;

        return (
          <article key={`home-category-${category}`} className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Coleccion</p>
                <h2 className="brand-display mt-1 text-3xl">{CATEGORY_LABELS[category]}</h2>
                <p className="text-sm text-[var(--muted-foreground)]">{items.length} referencias disponibles</p>
              </div>
              <Link href={`/catalogo?categoria=${category}`}>
                <Button variant="secondary">Ver toda la seccion</Button>
              </Link>
            </div>
            <ProductGrid products={items} />
          </article>
        );
      })}
    </section>
  );
}