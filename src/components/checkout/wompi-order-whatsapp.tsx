"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { adaptWhatsAppMessageForDevice } from "@/lib/cod-whatsapp";
import { buildWompiWhatsAppMessage, loadWompiOrder } from "@/lib/wompi-order";

interface WompiOrderWhatsAppProps {
  reference: string;
  transactionId?: string;
  paymentMethod?: string;
}

// Tras un pago aprobado, el cliente le manda a la tienda el pedido completo por WhatsApp.
export function WompiOrderWhatsApp({ reference, transactionId, paymentMethod }: WompiOrderWhatsAppProps) {
  const sendOrder = () => {
    // El pedido se guardó en este navegador al iniciar el pago; si no está (otro
    // dispositivo o modo privado), el mensaje lleva solo los datos del pago.
    const order = loadWompiOrder(reference);
    const message = adaptWhatsAppMessageForDevice(
      buildWompiWhatsAppMessage({ reference, transactionId, paymentMethod }, order)
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="grid gap-3 rounded-3xl border border-[var(--border)] bg-white p-6">
      <h2 className="text-xl font-semibold">Último paso: envíanos tu pedido</h2>
      <p className="text-sm text-[var(--muted-foreground)]">
        Tu pago quedó aprobado. Toca el botón para enviarnos por WhatsApp el detalle de tu pedido y coordinar el envío.
      </p>
      <Button onClick={sendOrder} className="justify-self-start">
        <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
        Enviar pedido por WhatsApp
      </Button>
    </div>
  );
}
