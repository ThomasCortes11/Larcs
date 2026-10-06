"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { AddiButton } from "@/components/checkout/addi-button";
import { CodCheckoutForm } from "@/components/checkout/cod-checkout-trigger";
import { PickupWhatsAppButton } from "@/components/checkout/pickup-whatsapp-button";
import { Input } from "@/components/ui/input";
import { SHIPPING_COST } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import { getCartSubtotal, useCartStore } from "@/store/cart-store";

const checkoutSchema = z.object({
  customerName: z.string().min(3, "Nombre requerido"),
  email: z.string().email("Email invalido"),
  phone: z.string().regex(/^3\d{9}$/, "Ingresa un celular colombiano de 10 dígitos."),
  address: z.string().min(8, "Direccion requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  department: z.string().min(2, "Departamento requerido")
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  wompiConfigured: boolean;
}

export function CheckoutForm({ wompiConfigured }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const subtotal = getCartSubtotal(items);
  const shipping = items.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange"
  });
  const [customerName, phone] = useWatch({ control: form.control, name: ["customerName", "phone"] });

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
            color: item.color,
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
        <h2 className="text-xl font-semibold">
          {wompiConfigured ? "Checkout seguro con Wompi" : "Checkout con Wompi en preparación"}
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          {wompiConfigured
            ? "El pago se abre en el checkout oficial de Wompi y te regresa a una pantalla de resultado al terminar."
            : "Wompi estará disponible cuando se configuren sus variables de entorno. Puedes usar ADDI o contra entrega mientras tanto."}
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
          Tu carrito esta vacio. <Link href="/catalogo" className="inline-flex min-h-[44px] items-center underline">Volver al catálogo</Link> para agregar productos.
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="space-y-1">
          <label htmlFor="wompi-name" className="text-sm font-medium">Nombre completo</label>
          <Input id="wompi-name" autoComplete="name" aria-invalid={Boolean(form.formState.errors.customerName)} aria-describedby={form.formState.errors.customerName ? "wompi-name-error" : undefined} {...form.register("customerName")} />
          {form.formState.errors.customerName ? <p id="wompi-name-error" className="text-xs text-red-600">{form.formState.errors.customerName.message}</p> : null}
        </div>
        <div className="space-y-1">
          <label htmlFor="wompi-email" className="text-sm font-medium">Correo electrónico</label>
          <Input id="wompi-email" type="email" autoComplete="email" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? "wompi-email-error" : undefined} {...form.register("email")} />
          {form.formState.errors.email ? <p id="wompi-email-error" className="text-xs text-red-600">{form.formState.errors.email.message}</p> : null}
        </div>
        <div className="space-y-1">
          <label htmlFor="wompi-phone" className="text-sm font-medium">Teléfono / celular</label>
          <Input id="wompi-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} aria-invalid={Boolean(form.formState.errors.phone)} aria-describedby={form.formState.errors.phone ? "wompi-phone-error" : "wompi-phone-hint"} {...form.register("phone")} />
          <p id="wompi-phone-hint" className="text-xs text-[var(--muted-foreground)]">10 dígitos, sin indicativo ni espacios.</p>
          {form.formState.errors.phone ? <p id="wompi-phone-error" className="text-xs text-red-600">{form.formState.errors.phone.message}</p> : null}
        </div>
        <div className="space-y-1">
          <label htmlFor="wompi-address" className="text-sm font-medium">Dirección completa</label>
          <Input id="wompi-address" autoComplete="street-address" aria-invalid={Boolean(form.formState.errors.address)} aria-describedby={form.formState.errors.address ? "wompi-address-error" : undefined} {...form.register("address")} />
          {form.formState.errors.address ? <p id="wompi-address-error" className="text-xs text-red-600">{form.formState.errors.address.message}</p> : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="wompi-city" className="text-sm font-medium">Ciudad</label>
            <Input id="wompi-city" autoComplete="address-level2" aria-invalid={Boolean(form.formState.errors.city)} aria-describedby={form.formState.errors.city ? "wompi-city-error" : undefined} {...form.register("city")} />
            {form.formState.errors.city ? <p id="wompi-city-error" className="text-xs text-red-600">{form.formState.errors.city.message}</p> : null}
          </div>
          <div className="space-y-1">
            <label htmlFor="wompi-department" className="text-sm font-medium">Departamento</label>
            <Input id="wompi-department" autoComplete="address-level1" aria-invalid={Boolean(form.formState.errors.department)} aria-describedby={form.formState.errors.department ? "wompi-department-error" : undefined} {...form.register("department")} />
            {form.formState.errors.department ? <p id="wompi-department-error" className="text-xs text-red-600">{form.formState.errors.department.message}</p> : null}
          </div>
        </div>
        {errorMessage ? <p role="alert" className="text-sm text-red-600">{errorMessage}</p> : null}
        <Button type="submit" disabled={isSubmitting || items.length === 0 || !wompiConfigured || !form.formState.isValid}>
          {isSubmitting ? "Redirigiendo a Wompi..." : wompiConfigured ? "Pagar con Wompi" : "Wompi en preparación"}
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
            Wompi es nuestra opción principal. También puedes solicitar ADDI, pagar contra entrega o recoger en tienda.
          </p>
        </div>
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
          disabled={items.length === 0}
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
          disabled={items.length === 0}
        />
        <PickupWhatsAppButton
          items={items.map((item) => ({
            name: item.name,
            sku: item.reference ?? item.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            unitPrice: item.price
          }))}
          total={total}
          customer={{ name: customerName, phone }}
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
