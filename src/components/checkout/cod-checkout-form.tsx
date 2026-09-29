"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Truck, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildCodWhatsAppMessage, type CodOrderItem } from "@/lib/cod-whatsapp";
import { cn, toCurrency } from "@/lib/utils";

type CodContext =
  | { type: "product"; product: CodOrderItem; sizes: string[] }
  | { type: "order"; items: CodOrderItem[]; total: number };

interface CodCheckoutFormProps {
  context: CodContext;
  className?: string;
  disabled?: boolean;
}

const codFormSchema = z.object({
  name: z.string().trim().min(3, "Escribe tu nombre completo."),
  phone: z
    .string()
    .regex(
      /^3\d{9}$/,
      "Ingresa un celular colombiano de 10 dígitos que inicie en 3."
    ),
  city: z.string().trim().min(2, "Escribe tu ciudad."),
  department: z.string().trim().min(2, "Escribe tu departamento."),
  address: z.string().trim().min(8, "Escribe una dirección completa."),
  reference: z.string().max(120, "Usa máximo 120 caracteres."),
  observations: z.string().max(300, "Usa máximo 300 caracteres."),
  size: z.string()
});

type CodFormValues = z.infer<typeof codFormSchema>;

function getContextItems(context: CodContext) {
  return context.type === "product" ? [context.product] : context.items;
}

function getContextTotal(context: CodContext) {
  return context.type === "product"
    ? context.product.unitPrice * context.product.quantity
    : context.total;
}

export function CodCheckoutForm({ context, className, disabled = false }: CodCheckoutFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const items = getContextItems(context);
  const total = getContextTotal(context);
  const requiresSize = context.type === "product" && !context.product.size;
  const schema = requiresSize
    ? codFormSchema.extend({ size: z.string().min(1, "Selecciona una talla.") })
    : codFormSchema;
  const form = useForm<CodFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      department: "",
      address: "",
      reference: "",
      observations: "",
      size: context.type === "product" ? (context.product.size ?? "") : ""
    }
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Reserve the tab during the click gesture before async form validation.
    const whatsappWindow = window.open("about:blank", "_blank");
    const validatedSubmit =
      form.handleSubmit(
        (values) => {
          const validOrderItems =
            context.type === "product"
              ? [{ ...context.product, size: values.size || context.product.size }]
              : context.items;
          const message = buildCodWhatsAppMessage({
            customer: {
              name: values.name,
              phone: values.phone,
              city: values.city,
              department: values.department,
              address: values.address,
              reference: values.reference,
              observations: values.observations
            },
            items: validOrderItems,
            total
          });
          const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

          if (whatsappWindow) {
            whatsappWindow.opener = null;
            whatsappWindow.location.replace(whatsappUrl);
          } else {
            window.location.assign(whatsappUrl);
          }

          setIsOpen(false);
          setIsSent(true);
        },
        () => whatsappWindow?.close()
      );

    void validatedSubmit(event);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn("space-y-2", className)}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Pago contra entrega: completa tus datos y envía el pedido por WhatsApp"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Truck className="h-4 w-4" aria-hidden="true" />
            <span>Pago contra entrega</span>
          </button>
        </Dialog.Trigger>
        <p className="text-center text-xs text-[var(--muted-foreground)]">
          Pagas al recibir tu pedido. Te contactaremos por WhatsApp para
          confirmar tu compra.
        </p>
        {isSent ? (
          <p
            role="status"
            className="text-center text-xs text-[var(--accent-green)]"
          >
            Se abrió WhatsApp con tu pedido. No vaciaremos el carrito hasta que
            confirmemos la compra.
          </p>
        ) : null}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Dialog.Title className="text-xl font-semibold">
                Pedido contra entrega
              </Dialog.Title>
              <Dialog.Description className="text-sm text-[var(--muted-foreground)]">
                Completa tus datos. Un asesor te escribirá para confirmar el
                envío y el pago al recibir.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar formulario de contra entrega"
                className="rounded-full p-2 hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div
            className="mb-5 space-y-2 rounded-xl bg-[var(--muted)] p-3 text-sm"
            aria-label="Datos del pedido"
          >
            {items.map((item, index) => (
              <div
                key={`${item.sku}-${item.size}-${index}`}
                className="flex justify-between gap-3"
              >
                <p className="min-w-0">
                  {item.quantity} x {item.name}{" "}
                  <span className="text-[var(--muted-foreground)]">
                    (Ref: {item.sku}, talla {item.size || "por seleccionar"}
                    {item.color ? `, ${item.color}` : ""})
                  </span>
                </p>
                <p className="shrink-0">
                  {toCurrency(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))}
            <p className="border-t border-[var(--border)] pt-2 text-right font-semibold">
              Total: {toCurrency(total)}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-3 sm:grid-cols-2"
          >
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="cod-name" className="text-sm font-medium">
                Nombre completo *
              </label>
              <Input
                id="cod-name"
                autoComplete="name"
                aria-invalid={Boolean(form.formState.errors.name)}
                aria-describedby={
                  form.formState.errors.name ? "cod-name-error" : undefined
                }
                {...form.register("name")}
              />
              {form.formState.errors.name ? (
                <p id="cod-name-error" className="text-xs text-red-600">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="cod-phone" className="text-sm font-medium">
                Teléfono / celular *
              </label>
              <Input
                id="cod-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                placeholder="3001234567"
                aria-invalid={Boolean(form.formState.errors.phone)}
                aria-describedby={
                  form.formState.errors.phone
                    ? "cod-phone-error"
                    : "cod-phone-hint"
                }
                {...form.register("phone")}
              />
              <p
                id="cod-phone-hint"
                className="text-xs text-[var(--muted-foreground)]"
              >
                Ingresa 10 dígitos, sin indicativo ni espacios.
              </p>
              {form.formState.errors.phone ? (
                <p id="cod-phone-error" className="text-xs text-red-600">
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1">
              <label htmlFor="cod-city" className="text-sm font-medium">
                Ciudad *
              </label>
              <Input
                id="cod-city"
                autoComplete="address-level2"
                aria-invalid={Boolean(form.formState.errors.city)}
                aria-describedby={
                  form.formState.errors.city ? "cod-city-error" : undefined
                }
                {...form.register("city")}
              />
              {form.formState.errors.city ? (
                <p id="cod-city-error" className="text-xs text-red-600">
                  {form.formState.errors.city.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1">
              <label htmlFor="cod-department" className="text-sm font-medium">
                Departamento *
              </label>
              <Input
                id="cod-department"
                autoComplete="address-level1"
                aria-invalid={Boolean(form.formState.errors.department)}
                aria-describedby={
                  form.formState.errors.department
                    ? "cod-department-error"
                    : undefined
                }
                {...form.register("department")}
              />
              {form.formState.errors.department ? (
                <p id="cod-department-error" className="text-xs text-red-600">
                  {form.formState.errors.department.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="cod-address" className="text-sm font-medium">
                Dirección completa *
              </label>
              <Input
                id="cod-address"
                autoComplete="street-address"
                aria-invalid={Boolean(form.formState.errors.address)}
                aria-describedby={
                  form.formState.errors.address
                    ? "cod-address-error"
                    : undefined
                }
                {...form.register("address")}
              />
              {form.formState.errors.address ? (
                <p id="cod-address-error" className="text-xs text-red-600">
                  {form.formState.errors.address.message}
                </p>
              ) : null}
            </div>
            {requiresSize && context.type === "product" ? (
              <div className="space-y-1 sm:col-span-2">
                <label htmlFor="cod-size" className="text-sm font-medium">
                  Talla *
                </label>
                <select
                  id="cod-size"
                  aria-invalid={Boolean(form.formState.errors.size)}
                  aria-describedby={
                    form.formState.errors.size ? "cod-size-error" : undefined
                  }
                  className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
                  {...form.register("size")}
                >
                  <option value="">Selecciona una talla</option>
                  {context.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {form.formState.errors.size ? (
                  <p id="cod-size-error" className="text-xs text-red-600">
                    {form.formState.errors.size.message}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="cod-reference" className="text-sm font-medium">
                Barrio / punto de referencia
              </label>
              <Input
                id="cod-reference"
                aria-invalid={Boolean(form.formState.errors.reference)}
                aria-describedby={
                  form.formState.errors.reference
                    ? "cod-reference-error"
                    : undefined
                }
                {...form.register("reference")}
              />
              {form.formState.errors.reference ? (
                <p id="cod-reference-error" className="text-xs text-red-600">
                  {form.formState.errors.reference.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="cod-observations" className="text-sm font-medium">
                Observaciones
              </label>
              <textarea
                id="cod-observations"
                rows={3}
                aria-invalid={Boolean(form.formState.errors.observations)}
                aria-describedby={
                  form.formState.errors.observations
                    ? "cod-observations-error"
                    : undefined
                }
                className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
                {...form.register("observations")}
              />
              {form.formState.errors.observations ? (
                <p id="cod-observations-error" className="text-xs text-red-600">
                  {form.formState.errors.observations.message}
                </p>
              ) : null}
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                className="w-full"
              >
                Enviar pedido por WhatsApp
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
