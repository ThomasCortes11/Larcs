export type CategoryKey = "botas" | "botines" | "flats" | "sandalias" | "tacones";

export interface ProductVariant {
  color: string;
  colors: string[];
  sizes: string[];
  stock?: number | null;
}

export interface Product {
  id: string;
  slug: string;
  reference: string | null;
  webReference: string;
  name: string;
  category: CategoryKey;
  categoryLabel: string;
  price: number;
  previousPrice?: number;
  discountPercentage?: number;
  description: string;
  features: string[];
  popularity: number;
  isNew: boolean;
  isPromo: boolean;
  imageUrls: string[];
  variant: ProductVariant;
}

export interface CatalogFilters {
  category?: CategoryKey;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  onlyPromo?: boolean;
  onlyNew?: boolean;
  sort?: "popular" | "newest" | "price-asc" | "price-desc";
}
