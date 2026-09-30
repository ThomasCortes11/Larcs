import { cache } from "react";

import productData from "@/data/products.json";
import type { CatalogFilters, Product } from "@/types/product";

const importedProducts = productData as Product[];

export const getAllProducts = cache(async () => importedProducts);

export const getProductBySlug = cache(async (slug: string) => {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) ?? null;
});

export async function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const products = await getAllProducts();
  return products.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 8);
}

export function applyCatalogFilters(products: Product[], filters: CatalogFilters) {
  const filtered = products.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.minPrice && item.price < filters.minPrice) return false;
    if (filters.maxPrice && item.price > filters.maxPrice) return false;
    if (
      filters.color &&
      !item.variant.colors.some(
        (color) => color.toLowerCase() === filters.color?.toLowerCase()
      )
    ) {
      return false;
    }
    if (filters.size && !item.variant.sizes.includes(filters.size)) return false;
    if (filters.onlyPromo && !item.isPromo) return false;
    if (filters.onlyNew && !item.isNew) return false;
    return true;
  });

  const sort = filters.sort ?? "popular";

  if (sort === "price-asc") {
    return filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    return filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }

  return filtered.sort((a, b) => b.popularity - a.popularity);
}

export function getCatalogFacets(products: Product[]) {
  return {
    colors: Array.from(new Set(products.flatMap((item) => item.variant.colors))).sort(),
    sizes: Array.from(new Set(products.flatMap((item) => item.variant.sizes))).sort()
  };
}
