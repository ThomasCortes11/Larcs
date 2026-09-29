"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ADDI_WHATSAPP_MESSAGE_BASE, WHATSAPP_NUMBER } from "@/lib/constants";
import { cn, toCurrency } from "@/lib/utils";

type AddiContext =
  | { type: "product"; name: string; sku: string; size: string; price: number }
  | {
      type: "order";
      items: Array<{
        name: string;
        quantity: number;
        sku?: string;
        size?: string;
      }>;
      total: number;
    };

interface AddiButtonProps {
  context: AddiContext;
  className?: string;
  disabled?: boolean;
}

function getItemDetails(sku?: string, size?: string) {
  return [sku ? `Ref: ${sku}` : "", size ? `Talla: ${size}` : ""]
    .filter(Boolean)
    .join(", ");
}

function getSummary(context: AddiContext) {
  if (context.type === "product") {
    return `${context.name} (${getItemDetails(context.sku, context.size)}) · ${toCurrency(context.price)}`;
  }

  const products = context.items
    .map((item) => {
      const details = getItemDetails(item.sku, item.size);
      return `${item.quantity}x ${item.name}${details ? ` (${details})` : ""}`;
    })
    .join(", ");

  return `${products}. Total: ${toCurrency(context.total)} COP`;
}

function getMessage(
  context: AddiContext,
  customerName: string,
  customerPhone: string
) {
  const customerDetails = `\n\nDatos del cliente:\nNombre: ${customerName}\nCelular: ${customerPhone}`;

  if (context.type === "product") {
    return `${ADDI_WHATSAPP_MESSAGE_BASE} el producto: ${context.name} (${getItemDetails(context.sku, context.size)}) - Precio: ${toCurrency(context.price)}. ¿Me ayudan a finalizar la compra?${customerDetails}`;
  }

  const products = context.items
    .map((item) => {
      const details = getItemDetails(item.sku, item.size);
      return `${item.quantity}x ${item.name}${details ? ` (${details})` : ""}`;
    })
    .join(", ");

  return `${ADDI_WHATSAPP_MESSAGE_BASE} mi pedido: ${products}. Total: ${toCurrency(context.total)} COP.${customerDetails}`;
}

export function AddiButton({ context, className, disabled = false }: AddiButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("customerName") ?? "").trim();
    const customerPhone = String(formData.get("customerPhone") ?? "").trim();
    const message = getMessage(context, customerName, customerPhone);
    const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setIsDialogOpen(false);
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className={cn("space-y-2", className)}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Paga con ADDI: completa tus datos para continuar por WhatsApp"
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-white px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <Image
              src="/api/assets/Logos/logo-addi.png"
              width={64}
              height={32}
              unoptimized
              alt="Logo de ADDI"
              className="h-8 w-16 object-contain"
            />
            <span>Paga con ADDI</span>
          </button>
        </Dialog.Trigger>
        <p className="text-center text-xs text-[var(--muted-foreground)]">
          Compra ahora y paga después con ADDI. Te atenderemos por WhatsApp.
        </p>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Dialog.Title className="text-xl font-semibold">
                Continúa con ADDI
              </Dialog.Title>
              <Dialog.Description className="text-sm text-[var(--muted-foreground)]">
                Déjanos tus datos y un asesor te ayudará a finalizar la compra
                por WhatsApp.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar formulario ADDI"
                className="rounded-full p-2 hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mb-5 rounded-xl bg-[var(--muted)] p-3 text-sm">
            <p className="mb-1 text-xs font-semibold text-[var(--muted-foreground)] uppercase">
              {context.type === "product"
                ? "Zapato seleccionado"
                : "Resumen del pedido"}
            </p>
            <p>{getSummary(context)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="addi-customer-name"
                className="text-sm font-medium"
              >
                Nombre completo
              </label>
              <input
                id="addi-customer-name"
                name="customerName"
                type="text"
                autoComplete="name"
                required
                minLength={3}
                placeholder="Tu nombre"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="addi-customer-phone"
                className="text-sm font-medium"
              >
                Celular de contacto
              </label>
              <input
                id="addi-customer-phone"
                name="customerPhone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                minLength={7}
                placeholder="300 123 4567"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              />
            </div>
            <Button type="submit" className="w-full">
              Continuar por WhatsApp
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
