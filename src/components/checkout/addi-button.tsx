"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type AddiContext =
  | {
      type: "product";
      name: string;
      sku: string;
      size: string;
      color?: string;
      quantity: number;
      price: number;
    }
  | {
      type: "order";
      items: Array<{
        name: string;
        quantity: number;
        sku?: string;
        size?: string;
        color?: string;
      }>;
      total: number;
    };

interface AddiButtonProps {
  context: AddiContext;
  className?: string;
  disabled?: boolean;
  // "option": fila compacta para el carrito lateral.
  variant?: "default" | "option";
}

const AddiDialog = dynamic(
  () => import("@/components/checkout/addi-dialog").then((module) => module.AddiDialog),
  { ssr: false }
);

export function AddiButton({ context, className, disabled = false, variant = "default" }: AddiButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialog = isDialogOpen ? <AddiDialog context={context} onClose={() => setIsDialogOpen(false)} /> : null;

  if (variant === "option") {
    return (
      <div className={className}>
        <button
          type="button"
          disabled={disabled}
          className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-3 py-2.5 text-left transition hover:border-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--muted)_45%,white)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--muted)_60%,white)]">
            <Image src="/api/assets/Logos/logo-addi.png" width={40} height={20} unoptimized alt="" className="h-5 w-10 object-contain" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Paga con ADDI</span>
            <span className="block text-xs text-[var(--muted-foreground)]">Compra hoy y paga después</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" aria-hidden />
        </button>
        {dialog}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label="Paga con ADDI: completa tus datos para continuar por WhatsApp"
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-white px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        onClick={() => setIsDialogOpen(true)}
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
      <p className="text-center text-xs text-[var(--muted-foreground)]">
        Compra ahora y paga después con ADDI. Te atenderemos por WhatsApp.
      </p>
      {dialog}
    </div>
  );
}
