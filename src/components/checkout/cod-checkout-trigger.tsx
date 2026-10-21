"use client";

import dynamic from "next/dynamic";
import { ChevronRight, Truck } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import type { CodContext } from "./cod-checkout-dialog";

const CodCheckoutDialog = dynamic(
  () =>
    import("@/components/checkout/cod-checkout-dialog").then(
      (module) => module.CodCheckoutDialog
    ),
  { ssr: false }
);

interface CodCheckoutFormProps {
  context: CodContext;
  className?: string;
  disabled?: boolean;
  // "option": fila compacta para el carrito lateral.
  variant?: "default" | "option";
}

export function CodCheckoutForm({
  context,
  className,
  disabled = false,
  variant = "default"
}: CodCheckoutFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const dialog = isOpen ? (
    <CodCheckoutDialog context={context} onClose={() => setIsOpen(false)} onSent={() => setIsSent(true)} />
  ) : null;
  const sentNote = isSent ? (
    <p role="status" className="text-center text-xs text-[var(--accent-green)]">
      Se abrió WhatsApp con tu pedido. No vaciaremos el carrito hasta que confirmemos la compra.
    </p>
  ) : null;

  if (variant === "option") {
    return (
      <div className={cn("space-y-2", className)}>
        <button
          type="button"
          disabled={disabled}
          className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-left transition hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--muted)_45%,white)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setIsOpen(true)}
        >
          <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--muted)_60%,white)] text-[var(--primary)]">
            <Truck className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Pago contra entrega</span>
            <span className="block text-xs text-[var(--muted-foreground)]">Pagas cuando lo recibes</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" aria-hidden />
        </button>
        {sentNote}
        {dialog}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label="Pago contra entrega: completa tus datos y envía el pedido por WhatsApp"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsOpen(true)}
      >
        <Truck className="h-4 w-4" aria-hidden="true" />
        <span>Pago contra entrega</span>
      </button>
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        Pagas al recibir tu pedido. Te contactaremos por WhatsApp para confirmar tu compra.
      </p>
      {sentNote}
      {dialog}
    </div>
  );
}
