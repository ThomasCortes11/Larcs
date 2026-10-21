import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { CategoryKey, Product } from "@/types/product";

interface CategorySectionsProps {
  products: Product[];
}

const orderedCategories: CategoryKey[] = ["botas", "botines", "tacones", "sandalias", "flats"];

// En el inicio solo una muestra por categoría; el resto vive en el catálogo.
const PREVIEW_COUNT = 4;

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
              <ProductGrid products={items.slice(0, PREVIEW_COUNT)} wide />
              {items.length > PREVIEW_COUNT ? (
                <Link
                  href={`/catalogo?categoria=${category}`}
                  className="group flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_26%,white)] bg-white/80 px-5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] sm:mx-auto sm:w-fit"
                >
                  Ver los {items.length} modelos de {CATEGORY_LABELS[category].toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </Link>
              ) : null}
            </article>
          </Reveal>
        );
      })}
    </section>
  );
}
