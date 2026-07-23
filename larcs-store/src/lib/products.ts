import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

import { CATEGORY_FOLDER_MAP } from "@/lib/constants";
import { toSlug } from "@/lib/utils";
import type { CatalogFilters, CategoryKey, Product } from "@/types/product";

const IMAGE_REGEX = /\.(png|jpe?g|webp)$/i;
const DEFAULT_FEATURES = [
  "Capellada premium",
  "Plantilla acolchada",
  "Suela antideslizante",
  "Hecho para uso urbano"
];

const BASE_PRICES: Record<CategoryKey, number> = {
  botas: 289900,
  botines: 239900,
  mocasines: 189900,
  sandalias: 169900,
  tacones: 219900
};

const MODEL_CODE_BASE_PRICE: Record<string, number> = {
  "02": 229900,
  "03": 239900,
  "096": 259900,
  "103": 239900,
  "115": 259900,
  "120": 279900,
  "554": 249900,
  "5807": 179900,
  "58037": 179900,
  "58073": 189900,
  "700": 269900,
  "701": 259900
};

const PRICE_ADJUSTMENTS: Array<[RegExp, number]> = [
  [/\bcharol\b/i, 30000],
  [/\bnapa\b/i, 22000],
  [/\bmicrofibra\b/i, 17000],
  [/\bplataforma\b/i, 28000],
  [/\bplatead[oa]\b|\bplata\b/i, 22000],
  [/\bperla\b/i, 18000],
  [/\bmandala\b/i, 12000],
  [/\btravisor\b/i, 15000]
];

const PROMO_HINTS = /\bcharol\b|\bplatead[oa]\b|\bplata\b|\bperla\b|\btravisor\b/i;

const CATEGORY_DEFAULT_SIZES: Record<CategoryKey, string[]> = {
  botas: ["35", "36", "37", "38", "39", "40"],
  botines: ["35", "36", "37", "38", "39", "40"],
  mocasines: ["35", "36", "37", "38", "39", "40"],
  sandalias: ["34", "35", "36", "37", "38", "39", "40"],
  tacones: ["34", "35", "36", "37", "38", "39", "40"]
};

function normalizeComparable(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeFileBaseName(fileName: string) {
  const noExt = fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/\b-\s*copia\b/gi, "")
    .replace(/\bedit\b/gi, "")
    .replace(/\bjpg\b/gi, "");

  const stripped = noExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b(IMG)\b/gi, "")
    .replace(/([A-Za-z\u00C0-\u017F])(\d+)\b/g, "$1")
    .replace(/\s+\d{1,2}\s*$/g, "")
    .trim();

  return stripped.length > 0 ? stripped : "untitled";
}

function hasMeaningfulProductName(base: string) {
  const normalized = normalizeComparable(base);

  if (!normalized || normalized === "untitled") return false;
  if (/^untitled[\s-\d]*$/i.test(normalized)) return false;
  if (/^img[\s_-]*\d*$/i.test(normalized)) return false;
  if (/^\d+[\s\d-]*$/.test(normalized)) return false;

  return /[a-z\u00c0-\u017f]{3,}/i.test(base);
}

function titleFromFileName(fileName: string, category: CategoryKey) {
  const base = normalizeFileBaseName(fileName);
  if (hasMeaningfulProductName(base)) {
    return base
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const fallback = {
    botas: "Bota Premium",
    botines: "Botin Premium",
    mocasines: "Mocasin Premium",
    sandalias: "Sandalia Premium",
    tacones: "Tacon Premium"
  };

  return fallback[category];
}

function buildImageUrl(folder: string, fileName: string) {
  const encoded = fileName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `/api/assets/${encodeURIComponent(folder)}/${encoded}`;
}

function inferModelCode(name: string) {
  const match = normalizeComparable(name).match(/^\s*(\d{2,5})\b/);
  return match?.[1];
}

function inferColor(name: string) {
  const lowered = normalizeComparable(name);
  if (lowered.includes("negro")) return "Negro";
  if (lowered.includes("blanco")) return "Blanco";
  if (lowered.includes("miel") || lowered.includes("camel")) return "Miel";
  if (lowered.includes("plata")) return "Plata";
  if (lowered.includes("plateado")) return "Plata";
  if (lowered.includes("perla")) return "Perla";
  if (lowered.includes("nude")) return "Nude";
  if (lowered.includes("vinotinto")) return "Vinotinto";
  if (lowered.includes("amarillo")) return "Amarillo";
  if (lowered.includes("rojo")) return "Rojo";
  if (lowered.includes("azul")) return "Azul";
  return "Unico";
}

function inferSizes(category: CategoryKey, name: string) {
  const lowered = normalizeComparable(name);
  if (lowered.includes("junior")) {
    return ["34", "35", "36", "37", "38", "39"];
  }

  return CATEGORY_DEFAULT_SIZES[category];
}

function inferPrice(category: CategoryKey, name: string) {
  const modelCode = inferModelCode(name);
  let price = modelCode ? (MODEL_CODE_BASE_PRICE[modelCode] ?? BASE_PRICES[category]) : BASE_PRICES[category];

  for (const [pattern, adjustment] of PRICE_ADJUSTMENTS) {
    if (pattern.test(name)) {
      price += adjustment;
    }
  }

  // Rounds to clean ecommerce prices while keeping deterministic values.
  return Math.round(price / 1000) * 1000;
}

function inferDescription(name: string, category: CategoryKey) {
  const color = inferColor(name);
  const lowered = normalizeComparable(name);
  const material = lowered.includes("charol")
    ? "charol"
    : lowered.includes("napa")
      ? "napa"
      : lowered.includes("microfibra")
        ? "microfibra"
        : "acabado premium";

  return `Modelo ${category} en ${material}, color ${color.toLowerCase()}, con horma comoda para uso diario.`;
}

function inferFeatures(name: string) {
  const lowered = normalizeComparable(name);
  const features = [...DEFAULT_FEATURES];

  if (lowered.includes("plataforma")) {
    features[0] = "Diseno con plataforma para mayor presencia";
  }

  if (lowered.includes("charol")) {
    features[1] = "Acabado charol de alto brillo";
  }

  if (lowered.includes("napa")) {
    features[2] = "Material napa con tacto suave";
  }

  return features;
}

async function readCategoryProducts(category: CategoryKey, folder: string) {
  const categoryPath = path.join(process.cwd(), "src", "Img", folder);
  const files = (await fs.readdir(categoryPath))
    .filter((f) => IMAGE_REGEX.test(f))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true, sensitivity: "base" }));

  const grouped = new Map<string, string[]>();
  for (const file of files) {
    const key = titleFromFileName(file, category);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)?.push(file);
  }

  const products: Product[] = [];
  let idx = 0;

  for (const [name, productFiles] of grouped.entries()) {
    const id = `${category}-${idx + 1}`;
    const slug = toSlug(`${category}-${name}-${idx + 1}`);
    const price = inferPrice(category, name);
    const previousPrice = PROMO_HINTS.test(name) ? price + 35000 : undefined;
    const discountPercentage = previousPrice
      ? Math.round(((previousPrice - price) / previousPrice) * 100)
      : undefined;
    const stock = Math.max(4, Math.min(36, productFiles.length * 4));
    const sizes = inferSizes(category, name);

    products.push({
      id,
      slug,
      name,
      category,
      price,
      previousPrice,
      discountPercentage,
      description: inferDescription(name, category),
      features: inferFeatures(name),
      popularity: 100 - idx,
      isNew: idx < 4,
      isPromo: Boolean(previousPrice),
      imageUrls: productFiles.map((f) => buildImageUrl(folder, f)),
      variant: {
        color: inferColor(name),
        sizes,
        stock
      }
    });

    idx += 1;
  }

  return products;
}

export const getAllProducts = cache(async () => {
  const entries = Object.entries(CATEGORY_FOLDER_MAP) as [CategoryKey, string][];
  const productsByCategory = await Promise.all(
    entries.map(([category, folder]) => readCategoryProducts(category, folder))
  );
  return productsByCategory.flat();
});

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
    if (filters.color && item.variant.color.toLowerCase() !== filters.color.toLowerCase()) return false;
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
    colors: Array.from(new Set(products.map((item) => item.variant.color))).sort(),
    sizes: Array.from(new Set(products.flatMap((item) => item.variant.sizes))).sort()
  };
}
