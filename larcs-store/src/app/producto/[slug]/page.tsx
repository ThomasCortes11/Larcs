import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ProductDetailActions } from "@/components/catalog/product-detail-actions";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { toCurrency } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado"
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.imageUrls[0] }]
    }
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const products = await getAllProducts();
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrls,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "LARCS"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: String(product.price),
      availability:
        product.variant.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-6">
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted-foreground)]">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/catalogo">Catalogo</Link>
          </li>
          <li>/</li>
          <li className="line-clamp-1 text-[var(--foreground)]">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery name={product.name} imageUrls={product.imageUrls} />
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-end gap-3">
            <p className="text-2xl font-bold">{toCurrency(product.price)}</p>
            {product.previousPrice ? (
              <p className="text-sm text-[var(--muted-foreground)] line-through">{toCurrency(product.previousPrice)}</p>
            ) : null}
            {product.discountPercentage ? <p className="text-sm font-semibold text-[var(--primary)]">-{product.discountPercentage}%</p> : null}
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">{product.description}</p>
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-white p-4 text-sm">
            <p>
              <span className="text-[var(--muted-foreground)]">Color:</span> {product.variant.color}
            </p>
            <p>
              <span className="text-[var(--muted-foreground)]">Stock:</span> {product.variant.stock} unidades
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {product.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
          <ProductDetailActions
            id={product.id}
            slug={product.slug}
            name={product.name}
            imageUrl={product.imageUrls[0]}
            price={product.price}
            sizes={product.variant.sizes}
          />
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-bold">Productos relacionados</h2>
        <ProductGrid products={related} />
      </div>
    </section>
  );
}
