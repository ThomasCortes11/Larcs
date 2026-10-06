"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddiButton } from "@/components/checkout/addi-button";
import { CodCheckoutForm } from "@/components/checkout/cod-checkout-trigger";
import { PickupWhatsAppButton } from "@/components/checkout/pickup-whatsapp-button";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = getCartSubtotal(items);
  const shipping = items.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Tu carrito</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Cerrar carrito" className="inline-flex h-11 w-11 items-center justify-center rounded-full p-0 hover:bg-[var(--muted)]">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-[9rem] flex-1 space-y-3 overflow-y-auto">
            {items.length === 0 ? <p className="text-sm text-[var(--muted-foreground)]">Aun no agregas productos.</p> : null}
            {items.map((item) => (
              <article key={`${item.id}-${item.size}-${item.color ?? ""}`} className="flex gap-3 rounded-2xl border border-[var(--border)] p-3">
                <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                  {item.reference ? <p className="text-xs text-[var(--muted-foreground)]">Ref. {item.reference}</p> : null}
                  <p className="text-xs text-[var(--muted-foreground)]">Talla {item.size}</p>
                  {item.color ? <p className="text-xs text-[var(--muted-foreground)]">Color {item.color}</p> : null}
                  <p className="text-sm">{toCurrency(item.price)} c/u</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Reducir cantidad de ${item.name}`}
                      disabled={item.quantity <= 1}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] disabled:opacity-40"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1, item.color)}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="min-w-6 text-center" aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)]"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1, item.color)}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button className="inline-flex min-h-11 items-center px-2 text-xs text-[var(--primary)]" onClick={() => removeItem(item.id, item.size, item.color)}>
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><span>{toCurrency(subtotal)}</span></p>
            <p className="flex justify-between"><span>Envio</span><span>{toCurrency(shipping)}</span></p>
            <p className="flex justify-between font-semibold"><span>Total</span><span>{toCurrency(total)}</span></p>
            <Dialog.Close asChild>
              <Link href="/pago" className="block pt-2">
                <Button className="w-full">Finalizar compra</Button>
              </Link>
            </Dialog.Close>
            {items.length > 0 ? (
              <PickupWhatsAppButton
                className="pt-1"
                items={items.map((item) => ({
                  name: item.name,
                  sku: item.reference ?? item.id,
                  size: item.size,
                  color: item.color,
                  quantity: item.quantity,
                  unitPrice: item.price
                }))}
                total={total}
              />
            ) : null}
            {items.length > 0 ? (
              <div className="space-y-3 border-t border-[var(--border)] pt-4">
                <p className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">Otras formas de pago</p>
                <AddiButton
                  context={{
                    type: "order",
                    items: items.map((item) => ({
                      name: item.name,
                      quantity: item.quantity,
                      sku: item.reference ?? item.id,
                      size: item.size,
                      color: item.color
                    })),
                    total
                  }}
                />
                <CodCheckoutForm
                  context={{
                    type: "order",
                    items: items.map((item) => ({
                      name: item.name,
                      sku: item.reference ?? item.id,
                      size: item.size,
                      color: item.color,
                      quantity: item.quantity,
                      unitPrice: item.price
                    })),
                    total
                  }}
                />
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
