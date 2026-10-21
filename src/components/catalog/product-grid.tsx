import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  // Cuatro columnas en pantallas grandes (inicio); el catálogo usa tres.
  wide?: boolean;
}

export function ProductGrid({ products, wide = false }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="rounded-2xl border border-[var(--border)] bg-white p-8 text-sm">No hay productos para los filtros seleccionados.</p>;
  }

  return (
    <section className={`grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 ${wide ? "xl:grid-cols-4" : ""}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
