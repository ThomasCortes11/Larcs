"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER, CATEGORY_LABELS } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.hasItem(product.id));
  const isOutOfStock = product.variant.stock != null && product.variant.stock <= 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border sm:rounded-3xl border-[var(--border)] bg-white shadow-[0_18px_40px_-36px_var(--ink-black)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-34px_var(--ink-black)]"
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_28%,white),white)] p-2 sm:p-4">
        <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/15 to-transparent" />
        <Image
          src={product.imageUrls[0] ?? BLUR_PLACEHOLDER}
          alt={product.imageUrls[0] ? product.name : `Imagen no disponible para ${product.name}`}
          fill
          className="object-contain p-2 transition duration-500 group-hover:scale-105 sm:p-5"
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) calc(50vw - 1.5rem), (max-width: 1350px) calc(33vw - 2rem), 400px"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </Link>
      <button
        type="button"
        aria-label="Guardar en favoritos"
        className={[
          "absolute right-2 top-2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/92 p-0 shadow-sm backdrop-blur transition active:scale-90 sm:right-4 sm:top-4 sm:h-11 sm:w-11",
          isWishlisted
            ? "border-[var(--primary)] text-[var(--primary)]"
            : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]"
        ].join(" ")}
        onClick={() => {
          const added = toggleWishlistItem({
            id: product.id,
            slug: product.slug,
            imageUrl: product.imageUrls[0] ?? BLUR_PLACEHOLDER,
            name: product.name,
            price: product.price
          });
          toast.success(added ? "Producto guardado en favoritos" : "Producto eliminado de favoritos");
        }}
      >
        <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <Badge>{product.categoryLabel ?? CATEGORY_LABELS[product.category]}</Badge>
          {isOutOfStock ? (
            <Badge>Agotado</Badge>
          ) : product.discountPercentage ? (
            <Badge>-{product.discountPercentage}%</Badge>
          ) : null}
        </div>
        <Link href={`/producto/${product.slug}`} className="min-h-10 text-sm font-semibold leading-snug text-[var(--foreground)] line-clamp-2 sm:flex sm:min-h-11 sm:items-center sm:truncate sm:text-lg">
          {product.name}
        </Link>
        <div className="mt-auto flex flex-wrap items-end gap-x-2">
          <span className="text-base font-bold sm:text-lg">{toCurrency(product.price)}</span>
          {product.previousPrice ? (
            <span className="text-xs text-[var(--muted-foreground)] line-through sm:text-sm">
              {toCurrency(product.previousPrice)}
            </span>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 px-2 text-xs transition active:scale-[0.97] sm:px-4 sm:text-sm"
            disabled={isOutOfStock}
            onClick={() => {
              addItem({
                id: product.id,
                slug: product.slug,
                imageUrl: product.imageUrls[0] ?? BLUR_PLACEHOLDER,
                name: product.name,
                reference: product.reference ?? product.webReference ?? product.id,
                price: product.price,
                size: product.variant.sizes[0] ?? "37",
                color: product.variant.colors[0] ?? product.variant.color
              });
              toast.success("Producto agregado al carrito");
            }}
          >
            {isOutOfStock ? "Agotado" : "Añadir al carrito"}
          </Button>

          {/* En celular la foto y el nombre ya llevan al detalle: dejamos un solo botón para que quepa. */}
          <Link href={`/producto/${product.slug}`} className="hidden flex-1 sm:block">
            <Button className="w-full">Ver detalles</Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
