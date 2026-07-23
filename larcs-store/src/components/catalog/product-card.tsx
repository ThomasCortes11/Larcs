"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_18px_40px_-36px_var(--ink-black)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-34px_var(--ink-black)]"
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/25 to-transparent" />
        <p className="absolute left-3 top-3 z-20 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] backdrop-blur">
          Stock {product.variant.stock}
        </p>
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </Link>
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
        <Button
          className="w-full"
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              imageUrl: product.imageUrls[0],
              name: product.name,
              price: product.price,
              size: "37"
            })
          }
        >
          Agregar al carrito
        </Button>
      </div>
    </motion.article>
  );
}
