import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogLookbook } from "@/components/catalog/catalog-lookbook";
import { ProductGrid } from "@/components/catalog/product-grid";
import { applyCatalogFilters, getAllProducts, getCatalogFacets } from "@/lib/products";
import type { CategoryKey } from "@/types/product";

interface CatalogoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const category = typeof params.categoria === "string" ? (params.categoria as CategoryKey) : undefined;
  const color = typeof params.color === "string" ? params.color : undefined;
  const size = typeof params.size === "string" ? params.size : undefined;
  const minPrice = typeof params.minPrice === "string" ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined;
  const sort =
    typeof params.sort === "string" &&
    ["popular", "newest", "price-asc", "price-desc"].includes(params.sort)
      ? (params.sort as "popular" | "newest" | "price-asc" | "price-desc")
      : "popular";

  const onlyPromo = params.promo === "on";
  const onlyNew = params.nuevo === "on";
  const products = await getAllProducts();
  const facets = getCatalogFacets(products);

  const filtered = applyCatalogFilters(products, {
    category,
    color,
    size,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    sort,
    onlyPromo,
    onlyNew
  });

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Catalogo</h1>
      <CatalogFilters
        selectedCategory={category}
        selectedColor={color}
        selectedSize={size}
        selectedSort={sort}
        minPrice={typeof params.minPrice === "string" ? params.minPrice : undefined}
        maxPrice={typeof params.maxPrice === "string" ? params.maxPrice : undefined}
        onlyPromo={onlyPromo}
        onlyNew={onlyNew}
        colors={facets.colors}
        sizes={facets.sizes}
      />
      <ProductGrid products={filtered} />
      <CatalogLookbook products={filtered} />
    </section>
  );
}
