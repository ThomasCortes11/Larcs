"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER } from "@/lib/constants";
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_18px_40px_-36px_var(--ink-black)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-34px_var(--ink-black)]"
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_28%,white),white)] p-4">
        <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white/15 to-transparent" />
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          className="object-contain p-5 transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </Link>
      <button
        type="button"
        aria-label="Guardar en favoritos"
        className={[
          "absolute right-4 top-4 z-20 rounded-full border bg-white/92 p-2 shadow-sm backdrop-blur transition",
          isWishlisted
            ? "border-[var(--primary)] text-[var(--primary)]"
            : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]"
        ].join(" ")}
        onClick={() => {
          const added = toggleWishlistItem({
            id: product.id,
            slug: product.slug,
            imageUrl: product.imageUrls[0],
            name: product.name,
            price: product.price
          });
          toast.success(added ? "Producto guardado en favoritos" : "Producto eliminado de favoritos");
        }}
      >
        <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
      </button>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <Badge>{product.category}</Badge>
          {product.discountPercentage ? <Badge>-{product.discountPercentage}%</Badge> : null}
        </div>
        <Link href={`/producto/${product.slug}`} className="line-clamp-1 text-lg font-semibold text-[var(--foreground)]">
          {product.name}
        </Link>
        <div className="flex items-end gap-2">
          <span className="text-lg font-bold">{toCurrency(product.price)}</span>
          {product.previousPrice ? (
            <span className="text-sm text-[var(--muted-foreground)] line-through">
              {toCurrency(product.previousPrice)}
            </span>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              addItem({
                id: product.id,
                slug: product.slug,
                imageUrl: product.imageUrls[0],
                name: product.name,
                price: product.price,
                size: product.variant.sizes[0] ?? "37"
              });
              toast.success("Producto agregado al carrito");
            }}
          >
            Anadir al carrito
          </Button>

          <Link href={`/producto/${product.slug}`} className="flex-1">
            <Button className="w-full">Ver detalles</Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
