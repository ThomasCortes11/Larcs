"use client";

import { Heart, Minus, Plus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AddiButton } from "@/components/checkout/addi-button";
import { CodCheckoutForm } from "@/components/checkout/cod-checkout-trigger";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface ProductDetailActionsProps {
  id: string;
  slug: string;
  name: string;
  sku: string;
  reference: string;
  price: number;
  color: string;
  colors: string[];
  imageUrl: string;
  sizes: string[];
  stock?: number | null;
}

export function ProductDetailActions({
  id,
  slug,
  name,
  sku,
  reference,
  price,
  color,
  colors,
  imageUrl,
  sizes,
  stock
}: ProductDetailActionsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) => state.hasItem(id));
  const [size, setSize] = useState(sizes[0] ?? "37");
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? color);
  const [quantity, setQuantity] = useState(1);
  const hasManagedStock = stock != null;
  const isOutOfStock = hasManagedStock && stock <= 0;
  const maxQuantity = hasManagedStock ? Math.max(1, stock) : Number.POSITIVE_INFINITY;

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(maxQuantity, current + 1));
  };

  return (
    <div className="space-y-4">
      {isOutOfStock ? (
        <p className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--danger)_10%,white)] px-3 py-2 text-sm font-semibold text-[var(--danger)]">
          Producto agotado temporalmente.
        </p>
      ) : null}

      <div>
        <p className="mb-2 text-sm font-semibold">Talla</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === size}
              className={`min-h-11 min-w-11 rounded-full border px-3 text-sm ${
                item === size
                  ? "border-[color-mix(in_srgb,var(--primary)_82%,black)] bg-[color-mix(in_srgb,var(--primary)_82%,black)] text-white"
                  : "border-[var(--border)]"
              }`}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {colors.length > 0 ? (
        <div>
          <p className="mb-2 text-sm font-semibold">Color: {selectedColor}</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={item === selectedColor}
                className={`min-h-11 rounded-full border px-3 text-sm ${
                  item === selectedColor
                    ? "border-[color-mix(in_srgb,var(--primary)_82%,black)] bg-[color-mix(in_srgb,var(--primary)_82%,black)] text-white"
                    : "border-[var(--border)]"
                }`}
                onClick={() => setSelectedColor(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-sm font-semibold">Cantidad</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Reducir cantidad"
            disabled={quantity <= 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] disabled:opacity-40"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-8 text-center" aria-live="polite">{quantity}</span>
          <button
            type="button"
            aria-label="Aumentar cantidad"
            disabled={hasManagedStock && quantity >= maxQuantity}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)]"
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          disabled={isOutOfStock}
          onClick={() => {
            addItem({ id, slug, name, reference, imageUrl, price, size, color: selectedColor }, quantity);
            toast.success(`${quantity} producto${quantity === 1 ? "" : "s"} agregado${quantity === 1 ? "" : "s"} al carrito`);
          }}
        >
          Agregar al carrito
        </Button>
        <Button
          variant="secondary"
          disabled={isOutOfStock}
          onClick={() => {
            addItem({ id, slug, name, reference, imageUrl, price, size, color: selectedColor }, quantity);
            toast.success("Producto listo para comprar");
            router.push("/pago");
          }}
        >
          Comprar ahora
        </Button>
        <button
          aria-label="Agregar a wishlist"
          className={`inline-flex h-[44px] min-h-[44px] w-[44px] min-w-[44px] items-center justify-center rounded-full border p-0 ${
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
          className="inline-flex h-[44px] min-h-[44px] w-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] p-0"
          onClick={async () => {
            const url = `${window.location.origin}/producto/${slug}`;
            await navigator.clipboard.writeText(url);
            toast.success("Enlace copiado");
          }}
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
      <AddiButton context={{ type: "product", name, sku, size, color: selectedColor, quantity, price }} disabled={isOutOfStock} />
      <CodCheckoutForm
        disabled={isOutOfStock}
        context={{
          type: "product",
          product: { name, sku, size, color: selectedColor, quantity, unitPrice: price },
          sizes
        }}
      />
    </div>
  );
}
