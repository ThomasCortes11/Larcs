"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { cartItemKey, useCartUiStore } from "@/store/cart-ui-store";
import type { Product } from "@/types/product";

interface QuickAddDialogProps {
  product: Product;
  onClose: () => void;
}

// Antes de añadir al carrito: la clienta escoge color, talla y cantidad.
export function QuickAddDialog({ product, onClose }: QuickAddDialogProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showAdded = useCartUiStore((state) => state.showAdded);
  const colors = product.variant.colors.length ? product.variant.colors : [product.variant.color].filter(Boolean);
  const sizes = product.variant.sizes;
  const stock = product.variant.stock;
  const maxQuantity = stock != null ? Math.max(1, stock) : 10;

  // Con un solo color o una sola talla se preselecciona; si hay varias, debe escoger.
  const [color, setColor] = useState<string | undefined>(colors.length === 1 ? colors[0] : undefined);
  const [size, setSize] = useState<string | undefined>(sizes.length === 1 ? sizes[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const missing = !size ? "la talla" : colors.length > 0 && !color ? "el color" : null;

  const add = () => {
    if (!size || (colors.length > 0 && !color)) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        imageUrl: product.imageUrls[0] ?? BLUR_PLACEHOLDER,
        name: product.name,
        reference: product.reference ?? product.webReference ?? product.id,
        price: product.price,
        size,
        color,
        sizes
      },
      quantity
    );
    onClose();
    showAdded(cartItemKey(product.id, size, color));
  };

  const chip = (active: boolean) =>
    [
      "min-h-11 rounded-full border px-4 text-sm font-medium transition active:scale-95",
      active
        ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_8px_18px_-10px_var(--primary)]"
        : "border-[var(--border)] bg-white hover:border-[var(--primary)]"
    ].join(" ");

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="cart-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="dialog-sheet fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-white p-5 pt-3 shadow-2xl sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-6"
        >
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[var(--border)] sm:hidden" aria-hidden />

          <div className="flex gap-4">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--muted)_50%,white)] sm:h-32 sm:w-28">
              <Image src={product.imageUrls[0] ?? BLUR_PLACEHOLDER} alt={product.name} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--primary)]">{product.categoryLabel}</p>
              <Dialog.Title className="mt-1 text-xl font-semibold leading-tight">{product.name}</Dialog.Title>
              <p className="mt-2 text-lg font-bold">{toCurrency(product.price)}</p>
              <Dialog.Close asChild>
                <Link href={`/producto/${product.slug}`} className="mt-1 inline-block text-xs font-medium text-[var(--muted-foreground)] underline-offset-2 hover:underline">
                  Ver todos los detalles
                </Link>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button aria-label="Cerrar" className="-mr-2 -mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-[var(--muted)]">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {colors.length > 0 ? (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">
                Color{color ? <span className="font-normal text-[var(--muted-foreground)]">: {color}</span> : null}
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((item) => (
                  <button key={item} type="button" aria-pressed={item === color} className={chip(item === color)} onClick={() => setColor(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">
              Talla{size ? <span className="font-normal text-[var(--muted-foreground)]">: {size}</span> : null}
            </p>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
              {sizes.map((item) => (
                <button key={item} type="button" aria-pressed={item === size} className={chip(item === size).replace("px-4", "px-0")} onClick={() => setSize(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Cantidad</p>
            <div className="inline-flex items-center rounded-full border border-[var(--border)]">
              <button
                type="button"
                aria-label="Reducir cantidad"
                disabled={quantity <= 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--muted)] disabled:opacity-30"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="min-w-8 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={quantity >= maxQuantity}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--muted)] disabled:opacity-30"
                onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <Button size="lg" className="mt-6 w-full gap-2" disabled={Boolean(missing)} onClick={add}>
            <ShoppingBag className="h-4 w-4" aria-hidden />
            {missing ? `Escoge ${missing}` : `Añadir al carrito · ${toCurrency(product.price * quantity)}`}
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
