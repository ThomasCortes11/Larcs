"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductDetailActionsProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: string[];
}

export function ProductDetailActions({
  id,
  slug,
  name,
  price,
  imageUrl,
  sizes
}: ProductDetailActionsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.hasItem(id));
  const [size, setSize] = useState(sizes[0] ?? "37");

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold">Talla</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item}
              className={`h-10 min-w-10 rounded-full border px-3 text-sm ${
                item === size
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)]"
              }`}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => {
            addItem({ id, slug, name, imageUrl, price, size });
            toast.success("Producto agregado al carrito");
          }}
        >
          Agregar al carrito
        </Button>
        <Button variant="secondary">Comprar ahora</Button>
        <button
          aria-label="Agregar a wishlist"
          className={`rounded-full border p-3 ${
            isWishlisted
              ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_10%,white)] text-[var(--primary)]"
              : "border-[var(--border)]"
          }`}
          onClick={() => {
            const added = toggleWishlistItem({ id, slug, name, price, imageUrl });
            toast.success(added ? "Producto guardado en favoritos" : "Producto eliminado de favoritos");
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          aria-label="Compartir"
          className="rounded-full border border-[var(--border)] p-3"
          onClick={async () => {
            const url = `${window.location.origin}/producto/${slug}`;
            await navigator.clipboard.writeText(url);
            toast.success("Enlace copiado");
          }}
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
