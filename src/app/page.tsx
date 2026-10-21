import { ConversionSections } from "@/components/home/conversion-sections";
import { BrandIdentity } from "@/components/home/brand-identity";
import { CategorySections } from "@/components/home/category-sections";
import { FeaturedSection } from "@/components/home/featured-section";
import { Hero } from "@/components/home/hero";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

// Dos fotos para la sección de historia: un par de botas y uno de tacones, si hay.
function storyImages(products: Awaited<ReturnType<typeof getAllProducts>>) {
  const pick = (category: string) =>
    products
      .filter((product) => product.category === category && product.imageUrls[0])
      .sort((first, second) => second.popularity - first.popularity)[0]?.imageUrls[0];
  return [pick("botas"), pick("tacones")].filter((image): image is string => Boolean(image));
}

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero products={products} />
      <BrandIdentity headingLevel="h2" images={storyImages(products)} />
      <FeaturedSection products={products} />
      <CategorySections products={products} />
      <ConversionSections />
    </>
  );
}
