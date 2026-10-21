// Pedido pagado con Wompi. La tienda no tiene base de datos: el pedido se guarda en
// el navegador del cliente al iniciar el pago y, cuando Wompi lo aprueba, la página de
// resultado lo usa para mandarle el detalle completo a la tienda por WhatsApp.

import { buildOrderSection, sanitizeText, type CodOrderItem } from "@/lib/cod-whatsapp";

export interface WompiOrder {
  reference: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    department: string;
  };
  items: CodOrderItem[];
  shipping: number;
  total: number;
}

const storageKey = (reference: string) => `larcs-wompi-order:${reference}`;

export function saveWompiOrder(order: WompiOrder) {
  try {
    window.localStorage.setItem(storageKey(order.reference), JSON.stringify(order));
  } catch {
    // Sin almacenamiento (modo privado): el pago funciona igual; el botón de WhatsApp
    // del resultado solo podrá enviar la referencia.
  }
}

export function loadWompiOrder(reference: string): WompiOrder | null {
  try {
    const raw = window.localStorage.getItem(storageKey(reference));
    return raw ? (JSON.parse(raw) as WompiOrder) : null;
  } catch {
    return null;
  }
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

interface PaymentDetails {
  reference: string;
  transactionId?: string;
  paymentMethod?: string;
}

export function buildWompiWhatsAppMessage(payment: PaymentDetails, order: WompiOrder | null) {
  const paymentSection = [
    "*Pago*",
    `🧾 Referencia: ${sanitizeText(payment.reference)}`,
    `🔐 Transacción Wompi: ${sanitizeText(payment.transactionId ?? "No disponible")}`,
    `💳 Método: ${sanitizeText(payment.paymentMethod ?? "No informado")}`
  ].join("\n");

  if (!order) {
    return [
      "✅ *PEDIDO PAGADO CON WOMPI*",
      "",
      paymentSection,
      "",
      "Hola, acabo de pagar en la tienda. Les comparto los datos del pago para coordinar el envío."
    ].join("\n");
  }

  const customer = order.customer;
  const customerSection = [
    "*Datos del cliente*",
    `👤 Nombre: ${sanitizeText(customer.name)}`,
    `📞 Teléfono: ${sanitizeText(customer.phone)}`,
    `✉️ Correo: ${sanitizeText(customer.email)}`,
    `📍 Ciudad: ${sanitizeText(customer.city)}, ${sanitizeText(customer.department)}`,
    `🏠 Dirección: ${sanitizeText(customer.address)}`
  ].join("\n");

  return [
    "✅ *NUEVO PEDIDO - PAGADO CON WOMPI*",
    "",
    paymentSection,
    "",
    customerSection,
    "",
    buildOrderSection(order.items, order.total),
    `🚚 Envío incluido: ${copFormatter.format(order.shipping)}`
  ].join("\n");
}
