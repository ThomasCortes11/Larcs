"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AddiButton } from "@/components/checkout/addi-button";
import { CodCheckoutForm } from "@/components/checkout/cod-checkout-form";
import { Input } from "@/components/ui/input";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

const checkoutSchema = z.object({
  customerName: z.string().min(3, "Nombre requerido"),
  email: z.string().email("Email invalido"),
  phone: z.string().min(7, "Telefono invalido"),
  address: z.string().min(8, "Direccion requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  department: z.string().min(2, "Departamento requerido")
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const subtotal = getCartSubtotal(items);
  const shipping = items.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (!items.length) {
      setErrorMessage("Tu carrito esta vacio. Agrega productos antes de pagar.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/payments/wompi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          items: items.map((item) => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity
          }))
        })
      });

      const result = (await response.json()) as { checkoutUrl?: string; error?: string };

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error ?? "No se pudo crear el checkout de Wompi.");
      }

      window.location.assign(result.checkoutUrl);
    } catch (submissionError) {
      setErrorMessage(submissionError instanceof Error ? submissionError.message : "No se pudo iniciar el pago.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="grid gap-4 rounded-3xl border border-[var(--border)] bg-white p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Checkout seguro con Wompi</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          El pago se abre en el checkout oficial de Wompi y te regresa a una pantalla de resultado al terminar.
        </p>
      </div>

      {items.length ? (
        <div className="rounded-2xl bg-[var(--muted)] p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span>Subtotal</span>
            <span>{toCurrency(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between gap-4">
            <span>Envio</span>
            <span>{toCurrency(shipping)}</span>
          </div>
          <div className="mt-2 flex justify-between gap-4 font-semibold">
            <span>Total</span>
            <span>{toCurrency(total)}</span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--muted)]/50 p-4 text-sm text-[var(--muted-foreground)]">
          Tu carrito esta vacio. <Link href="/catalogo" className="underline">Volver al catálogo</Link> para agregar productos.
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
      <Input placeholder="Nombre completo" {...form.register("customerName")} />
      <Input placeholder="Email" type="email" {...form.register("email")} />
      <Input placeholder="Telefono" {...form.register("phone")} />
      <Input placeholder="Direccion" {...form.register("address")} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Ciudad" {...form.register("city")} />
        <Input placeholder="Departamento" {...form.register("department")} />
      </div>
      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
      <Button type="submit" disabled={isSubmitting || items.length === 0}>
        {isSubmitting ? "Redirigiendo a Wompi..." : "Pagar con Wompi"}
      </Button>
      </form>
      <section
        aria-labelledby="other-payment-methods"
        className="space-y-3 border-t border-[var(--border)] pt-4"
      >
        <div className="space-y-1">
          <h3 id="other-payment-methods" className="text-sm font-semibold">
            Otros medios de pago
          </h3>
          <p className="text-xs text-[var(--muted-foreground)]">
            Wompi es nuestra opción principal. También puedes solicitar ADDI o pagar contra entrega.
          </p>
        </div>
        <AddiButton
          context={{
            type: "order",
            items: items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              sku: item.id,
              size: item.size
            })),
            total
          }}
          disabled={items.length === 0}
        />
        <CodCheckoutForm
          context={{
            type: "order",
            items: items.map((item) => ({
              name: item.name,
              sku: item.id,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              unitPrice: item.price
            })),
            total
          }}
          disabled={items.length === 0}
        />
        {items.length === 0 ? (
          <p className="text-center text-xs text-[var(--muted-foreground)]">
            Agrega productos al carrito para habilitar estos métodos de pago.
          </p>
        ) : null}
      </section>
    </div>
  );
}
