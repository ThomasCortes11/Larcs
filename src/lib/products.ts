import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";

import type { CatalogFilters, Product } from "@/types/product";

const productsJsonPath = path.join(process.cwd(), "src", "data", "products.json");

async function readProductsFile() {
  const fileContent = await readFile(productsJsonPath, "utf8");
  return JSON.parse(fileContent) as Product[];
}

function matchesSearchQuery(product: Product, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const searchableText = [
    product.name,
    product.slug,
    product.description,
    product.category,
    product.categoryLabel,
    product.reference ?? "",
    product.webReference,
    product.variant.color,
    ...product.variant.colors,
    ...product.features
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export async function getAllProducts() {
  noStore();
  return readProductsFile();
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function updateProductStock(productId: string, stock: number | null) {
  const products = await readProductsFile();
  const productIndex = products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    return null;
  }

  const safeStock = stock == null ? null : Math.max(0, Math.trunc(stock));
  const updatedProduct: Product = {
    ...products[productIndex],
    variant: {
      ...products[productIndex].variant,
      stock: safeStock
    }
  };

  const updatedProducts = [...products];
  updatedProducts[productIndex] = updatedProduct;
  await writeFile(productsJsonPath, `${JSON.stringify(updatedProducts, null, 2)}\n`, "utf8");

  return updatedProduct;
}

export async function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const products = await getAllProducts();
  return products.filter((item) => matchesSearchQuery(item, q)).slice(0, 8);
}

export function applyCatalogFilters(products: Product[], filters: CatalogFilters) {
  const filtered = products.filter((item) => {
    if (filters.query && !matchesSearchQuery(item, filters.query)) return false;
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
