import Image from "next/image";

import { BLUR_PLACEHOLDER } from "@/lib/constants";
import type { Product } from "@/types/product";

interface CatalogLookbookProps {
  products: Product[];
}

export function CatalogLookbook({ products }: CatalogLookbookProps) {
  const images = products.flatMap((product) =>
    product.imageUrls.map((url, idx) => ({
      url,
      name: product.name,
      key: `${product.id}-${idx}`
    }))
  );

  if (images.length === 0) return null;

  return (
    <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Lookbook completo</p>
        <h2 className="brand-display mt-1 text-3xl">Todas las imagenes de esta seccion</h2>
        <p className="text-sm text-[var(--muted-foreground)]">{images.length} imagenes disponibles</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, idx) => (
          <figure
            key={image.key}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] ${
              idx % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}