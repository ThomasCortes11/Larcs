"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = getCartSubtotal(items);
  const total = subtotal + (items.length ? SHIPPING_COST : 0);

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Carrito</h1>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-3">
          {items.map((item) => (
            <article key={`${item.id}-${item.size}`} className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Talla {item.size}</p>
                  <p className="text-sm">{toCurrency(item.price)} x {item.quantity}</p>
                </div>
                <button
                  className="text-sm text-[var(--primary)]"
                  onClick={() => removeItem(item.id, item.size)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
          {items.length === 0 ? <p className="text-sm">Tu carrito esta vacio.</p> : null}
        </div>
        <aside className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <p className="font-semibold">Resumen</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><span>{toCurrency(subtotal)}</span></p>
            <p className="flex justify-between"><span>Envio</span><span>{toCurrency(items.length ? SHIPPING_COST : 0)}</span></p>
            <p className="flex justify-between font-bold"><span>Total</span><span>{toCurrency(total)}</span></p>
          </div>
          <Link href="/pago" className="mt-5 block">
            <Button className="w-full">Ir a pagar</Button>
          </Link>
        </aside>
      </div>
    </section>
  );
}
