import Link from "next/link";

import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { CategoryKey, Product } from "@/types/product";

interface CategorySectionsProps {
  products: Product[];
}

const orderedCategories: CategoryKey[] = ["botas", "botines", "tacones", "sandalias", "flats"];

export function CategorySections({ products }: CategorySectionsProps) {
  return (
    <section className="mx-auto max-w-7xl space-y-14 px-4 py-4 md:px-6">
      {orderedCategories.map((category) => {
        const items = products.filter((product) => product.category === category);
        if (items.length === 0) return null;

        return (
          <Reveal key={`home-category-${category}`}>
            <article className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Colección</p>
                  <h2 className="brand-display mt-1 text-3xl">{CATEGORY_LABELS[category]}</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">{items.length} referencias disponibles</p>
                </div>
                <Link href={`/catalogo?categoria=${category}`} className="hidden sm:block">
                  <Button variant="secondary">Ver toda la sección</Button>
                </Link>
              </div>
              <ProductGrid products={items} wide />
            </article>
          </Reveal>
        );
      })}
    </section>
  );
}
