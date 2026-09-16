import { ConversionSections } from "@/components/home/conversion-sections";
import { CategorySections } from "@/components/home/category-sections";
import { FeaturedSection } from "@/components/home/featured-section";
import { Hero } from "@/components/home/hero";
import { getAllProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero products={products} />
      <FeaturedSection products={products} />
      <CategorySections products={products} />
      <ConversionSections />
    </>
  );
}
