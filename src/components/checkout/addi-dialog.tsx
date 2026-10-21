"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";
import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { ADDI_WHATSAPP_MESSAGE_BASE, WHATSAPP_NUMBER } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";

import type { AddiContext } from "./addi-button";

interface AddiDialogProps {
  context: AddiContext;
  onClose: () => void;
}

function getItemDetails(sku?: string, size?: string, color?: string) {
  return [
    sku ? `Ref: ${sku.replace(/^ref\.?\s*:?\s*/i, "")}` : "",
    size ? `Talla: ${size}` : "",
    color ? `Color: ${color}` : ""
  ]
    .filter(Boolean)
    .join(", ");
}

function getMessage(
  context: AddiContext,
  customerName: string,
  customerPhone: string
) {
  const customerDetails = `\n\nDatos del cliente:\nNombre: ${customerName}\nCelular: ${customerPhone}`;

  if (context.type === "product") {
    return `${ADDI_WHATSAPP_MESSAGE_BASE} el producto: ${context.name} (${getItemDetails(context.sku, context.size, context.color)}) - Cantidad: ${context.quantity}. Precio unitario: ${toCurrency(context.price)}. Total: ${toCurrency(context.price * context.quantity)}. ¿Me ayudan a finalizar la compra?${customerDetails}`;
  }

  const products = context.items
    .map((item) => {
      const details = getItemDetails(item.sku, item.size, item.color);
      return `${item.quantity}x ${item.name}${details ? ` (${details})` : ""}`;
    })
    .join(", ");

  return `${ADDI_WHATSAPP_MESSAGE_BASE} mi pedido: ${products}. Total: ${toCurrency(context.total)} COP.${customerDetails}`;
}

export function AddiDialog({ context, onClose }: AddiDialogProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("customerName") ?? "")
      .replace(/\s+/g, " ")
      .trim();
    const customerPhone = String(formData.get("customerPhone") ?? "")
      .replace(/\s+/g, " ")
      .trim();
    const message = getMessage(context, customerName, customerPhone);
    const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    onClose();
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="cart-overlay fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content className="dialog-sheet fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-white p-5 pt-3 shadow-2xl sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-6 sm:pt-6">
          {/* En celular la ventana sube desde abajo; esta barrita lo indica. */}
          <div
            className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[var(--border)] sm:hidden"
            aria-hidden
          />
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-12 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--muted)_60%,white)]">
                <Image
                  src="/api/assets/Logos/logo-addi.png"
                  width={44}
                  height={22}
                  unoptimized
                  alt=""
                  className="h-6 w-11 object-contain"
                />
              </span>
              <div className="space-y-1">
                <Dialog.Title className="text-xl font-semibold">
                  Continúa con ADDI
                </Dialog.Title>
                <Dialog.Description className="text-sm text-[var(--muted-foreground)]">
                  Déjanos tus datos y un asesor te ayudará a finalizar la compra
                  por WhatsApp.
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Cerrar formulario ADDI"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full p-0 hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mb-5 space-y-2 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--muted)_45%,white)] p-4 text-sm">
            <p className="text-xs font-semibold tracking-[0.12em] text-[var(--muted-foreground)] uppercase">
              {context.type === "product"
                ? "Zapato seleccionado"
                : "Resumen del pedido"}
            </p>
            {(context.type === "product"
              ? [
                  {
                    name: context.name,
                    quantity: context.quantity,
                    sku: context.sku,
                    size: context.size,
                    color: context.color
                  }
                ]
              : context.items
            ).map((item, index) => {
              const details = getItemDetails(item.sku, item.size, item.color);
              return (
                <div key={`${item.sku}-${item.size}-${index}`}>
                  <p className="font-medium">
                    {item.quantity} × {item.name}
                  </p>
                  {details ? (
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {details}
                    </p>
                  ) : null}
                </div>
              );
            })}
            <p className="flex justify-between border-t border-[var(--border)] pt-2 font-semibold">
              <span>Total</span>
              <span>
                {toCurrency(
                  context.type === "product"
                    ? context.price * context.quantity
                    : context.total
                )}
              </span>
            </p>
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
                maxLength={100}
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
                maxLength={20}
                placeholder="300 123 4567"
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              />
            </div>
            <Button type="submit" size="lg" className="w-full gap-2">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Continuar por WhatsApp
            </Button>
            <p className="text-center text-xs text-[var(--muted-foreground)]">
              Sujeto a aprobación de ADDI. Un asesor te acompaña en el proceso.
            </p>
            <p className="text-center text-xs text-[var(--muted-foreground)]">
              Al enviar autorizas el tratamiento de tus datos según nuestra{" "}
              <Link
                href="/privacidad"
                target="_blank"
                className="font-medium text-[var(--primary)] hover:underline"
              >
                política de datos personales
              </Link>
              .
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
