"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddiButton } from "@/components/checkout/addi-button";
import { CodCheckoutForm } from "@/components/checkout/cod-checkout-trigger";
import { PickupWhatsAppButton } from "@/components/checkout/pickup-whatsapp-button";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";
import { cartItemKey, useCartUiStore } from "@/store/cart-ui-store";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const updateSize = useCartStore((state) => state.updateSize);
  const lastAddedKey = useCartUiStore((state) => state.lastAddedKey);

  const subtotal = getCartSubtotal(items);
  const shipping = items.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const lastAdded = items.find((item) => cartItemKey(item.id, item.size, item.color) === lastAddedKey);
  // Lo más reciente primero, y lo que se acaba de agregar siempre arriba.
  const orderedItems = [...items]
    .reverse()
    .sort((first, second) => Number(second === lastAdded) - Number(first === lastAdded));

  const orderItems = items.map((item) => ({
    name: item.name,
    sku: item.reference ?? item.id,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    unitPrice: item.price
  }));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="cart-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="cart-panel fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[color-mix(in_srgb,var(--background)_40%,white)] shadow-2xl"
        >
          {/* Encabezado */}
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-white px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)]">
                <ShoppingBag className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <Dialog.Title className="text-lg font-semibold leading-tight">Tu carrito</Dialog.Title>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {itemCount === 0 ? "Sin productos" : `${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
                </p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button aria-label="Cerrar carrito" className="inline-flex h-11 w-11 items-center justify-center rounded-full p-0 transition hover:bg-[var(--muted)]">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Aviso del producto recién agregado */}
          <AnimatePresence>
            {lastAdded ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 border-b border-[color-mix(in_srgb,var(--accent-green)_40%,white)] bg-[color-mix(in_srgb,var(--accent-green)_16%,white)] px-5 py-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color-mix(in_srgb,var(--accent-green)_60%,black)]" aria-hidden />
                <p>
                  <span className="font-semibold">Agregaste {lastAdded.name}.</span>{" "}
                  <span className="text-[var(--muted-foreground)]">Ya está en tu carrito.</span>
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Productos */}
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,white)] text-[var(--primary)]">
                  <ShoppingBag className="h-9 w-9" aria-hidden />
                </span>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">Tu carrito está vacío</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Descubre botines, tacones, botas, sandalias y flats.</p>
                </div>
                <Dialog.Close asChild>
                  <Link href="/catalogo">
                    <Button>Ver catálogo</Button>
                  </Link>
                </Dialog.Close>
              </div>
            ) : null}

            <AnimatePresence initial={false}>
              {orderedItems.map((item) => {
                const key = cartItemKey(item.id, item.size, item.color);
                const isNew = key === lastAddedKey;
                const sizeOptions = item.sizes?.length ? item.sizes : null;

                return (
                  <motion.article
                    key={key}
                    layout
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className={[
                      "relative flex gap-3 rounded-2xl border bg-white p-3 shadow-[0_10px_30px_-26px_var(--ink-black)]",
                      isNew ? "border-[var(--primary)] ring-2 ring-[color-mix(in_srgb,var(--primary)_18%,white)]" : "border-[var(--border)]"
                    ].join(" ")}
                  >
                    <Dialog.Close asChild>
                      <Link
                        href={`/producto/${item.slug}`}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--muted)_50%,white)]"
                      >
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="96px" />
                      </Link>
                    </Dialog.Close>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="pr-8">
                        <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                        {item.reference ? (
                          <p className="line-clamp-1 text-[11px] text-[var(--muted-foreground)]">{item.reference}</p>
                        ) : null}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        {sizeOptions ? (
                          <label className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-white pl-3 pr-1">
                            <span className="text-[var(--muted-foreground)]">Talla</span>
                            <select
                              value={item.size}
                              aria-label={`Talla de ${item.name}`}
                              onChange={(event) => updateSize(item.id, item.size, event.target.value, item.color)}
                              className="h-8 cursor-pointer rounded-full bg-transparent pr-1 font-semibold outline-none"
                            >
                              {sizeOptions.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </label>
                        ) : (
                          <span className="rounded-full bg-[var(--muted)] px-3 py-1.5">Talla {item.size}</span>
                        )}
                        {item.color ? <span className="rounded-full bg-[var(--muted)] px-3 py-1.5">{item.color}</span> : null}
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                        <div className="inline-flex items-center rounded-full border border-[var(--border)]">
                          <button
                            type="button"
                            aria-label={`Reducir cantidad de ${item.name}`}
                            disabled={item.quantity <= 1}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--muted)] disabled:opacity-30"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1, item.color)}
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--muted)]"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1, item.color)}
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{toCurrency(item.price * item.quantity)}</p>
                          {item.quantity > 1 ? (
                            <p className="text-[11px] text-[var(--muted-foreground)]">{toCurrency(item.price)} c/u</p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Eliminar ${item.name} del carrito`}
                      className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--primary)]"
                      onClick={() => removeItem(item.id, item.size, item.color)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {items.length > 0 ? (
              <div className="space-y-2 pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                  O compra como prefieras
                </p>
                <PickupWhatsAppButton variant="option" items={orderItems} total={total} />
                <AddiButton
                  variant="option"
                  context={{
                    type: "order",
                    items: orderItems.map(({ name, quantity, sku, size, color }) => ({ name, quantity, sku, size, color })),
                    total
                  }}
                />
                <CodCheckoutForm variant="option" context={{ type: "order", items: orderItems, total }} />
              </div>
            ) : null}
          </div>

          {/* Pie fijo: total y pago */}
          {items.length > 0 ? (
            <div className="shrink-0 space-y-3 border-t border-[var(--border)] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-16px_30px_-28px_var(--ink-black)]">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Total</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Productos {toCurrency(subtotal)} + envío {toCurrency(shipping)}
                  </p>
                </div>
                <p className="text-2xl font-bold">{toCurrency(total)}</p>
              </div>
              <Dialog.Close asChild>
                <Link href="/pago" className="block">
                  <Button size="lg" className="w-full gap-2 shadow-[0_16px_30px_-18px_var(--primary)]">
                    <Lock className="h-4 w-4" aria-hidden />
                    Pagar con Wompi
                  </Button>
                </Link>
              </Dialog.Close>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
