"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = getCartSubtotal(items);
  const shipping = items.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button aria-label="Abrir carrito" className="relative rounded-full p-2 hover:bg-[var(--muted)]">
          <ShoppingBag className="h-5 w-5" />
          {items.length > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs text-white">
              {items.length}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Tu carrito</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Cerrar carrito" className="rounded-full p-2 hover:bg-[var(--muted)]">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {items.length === 0 ? <p className="text-sm text-[var(--muted-foreground)]">Aun no agregas productos.</p> : null}
            {items.map((item) => (
              <article key={`${item.id}-${item.size}`} className="flex gap-3 rounded-2xl border border-[var(--border)] p-3">
                <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Talla {item.size}</p>
                  <p className="text-sm">{toCurrency(item.price)} x {item.quantity}</p>
                </div>
                <button className="text-xs text-[var(--primary)]" onClick={() => removeItem(item.id, item.size)}>
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><span>{toCurrency(subtotal)}</span></p>
            <p className="flex justify-between"><span>Envio</span><span>{toCurrency(shipping)}</span></p>
            <p className="flex justify-between font-semibold"><span>Total</span><span>{toCurrency(total)}</span></p>
            <Link href="/pago" className="block pt-2">
              <Button className="w-full">Finalizar compra</Button>
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
