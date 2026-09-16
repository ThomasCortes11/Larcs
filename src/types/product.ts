export type CategoryKey = "botas" | "botines" | "mocasines" | "sandalias" | "tacones";

export interface ProductVariant {
  color: string;
  sizes: string[];
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryKey;
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
