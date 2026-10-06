"use client";

import { Store } from "lucide-react";

import { PICKUP_DISCOUNT_COPY, WHATSAPP_NUMBER } from "@/lib/constants";
import { adaptWhatsAppMessageForDevice, type CodOrderItem } from "@/lib/cod-whatsapp";
import { buildPickupWhatsAppMessage } from "@/lib/pickup-whatsapp";
import { cn } from "@/lib/utils";

interface PickupWhatsAppButtonProps {
  items: CodOrderItem[];
  total: number;
  customer?: { name?: string; phone?: string };
  className?: string;
  disabled?: boolean;
}

export function PickupWhatsAppButton({
  items,
  total,
  customer,
  className,
  disabled = false
}: PickupWhatsAppButtonProps) {
  function handleClick() {
    const message = adaptWhatsAppMessageForDevice(
      buildPickupWhatsAppMessage({ customer, items, total })
    );
    const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-label="Recoge en tienda física: envía tu pedido por WhatsApp y consulta tu descuento"
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f08a78_0%,#c65799_55%,#a53a7c_100%)] px-5 py-3 text-base font-bold text-white shadow-[0_14px_26px_-16px_var(--primary)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        onClick={handleClick}
      >
        <Store className="h-5 w-5" aria-hidden="true" />
        <span>Recoge en tienda física</span>
      </button>
      <p className="text-center text-xs text-[var(--muted-foreground)]">{PICKUP_DISCOUNT_COPY}</p>
    </div>
  );
}
