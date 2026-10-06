import { buildOrderSection, sanitizeText, type CodOrderItem } from "@/lib/cod-whatsapp";
import { STORE_ADDRESS } from "@/lib/constants";

interface BuildPickupWhatsAppMessageOptions {
  customer?: { name?: string; phone?: string };
  items: CodOrderItem[];
  total: number;
}

export function buildPickupWhatsAppMessage({
  customer,
  items,
  total
}: BuildPickupWhatsAppMessageOptions) {
  const name = sanitizeText(customer?.name ?? "");
  const phone = sanitizeText(customer?.phone ?? "");
  const customerLines = [
    name ? `👤 Nombre: ${name}` : null,
    phone ? `📞 Teléfono: ${phone}` : null
  ].filter((line): line is string => line !== null);

  const customerSection = customerLines.length
    ? ["", "*Mis datos*", ...customerLines]
    : [];

  return [
    "Hola LARCS 👋",
    "Quiero recoger mi pedido en la tienda física.",
    ...customerSection,
    "",
    "*Punto de recogida*",
    `📍 ${STORE_ADDRESS}`,
    "",
    buildOrderSection(items, total),
    "",
    "Entiendo que por recoger en el punto físico tengo descuento, que se gestiona directamente en la tienda.",
    "¿Me confirman disponibilidad y horario de atención?"
  ].join("\n");
}
