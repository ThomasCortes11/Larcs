export interface CodOrderItem {
  name: string;
  sku: string;
  size?: string;
  color?: string;
  quantity: number;
  unitPrice: number;
}

export interface CodCustomerDetails {
  name: string;
  phone: string;
  city: string;
  department: string;
  address: string;
  reference: string;
  observations: string;
}

interface BuildCodWhatsAppMessageOptions {
  customer: CodCustomerDetails;
  items: CodOrderItem[];
  total: number;
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

export function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatItemName(item: CodOrderItem) {
  const name = sanitizeText(item.name);
  const sku = sanitizeText(item.sku);
  return `${name}${sku ? ` (Ref: ${sku})` : ""}`;
}

// WhatsApp de escritorio muestra los emojis de la URL como "�"; en celular se conservan.
export function adaptWhatsAppMessageForDevice(message: string) {
  const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (isMobile) return message;

  return message
    .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, "")
    .replace(/ {2,}/g, " ")
    .replace(/^ /gm, "");
}

export function buildOrderSection(items: CodOrderItem[], total: number) {
  const orderLines = items.map((item) => {
    const size = sanitizeText(item.size ?? "") || "No especificada";
    const color = sanitizeText(item.color ?? "") || "No aplica";
    const itemName = formatItemName(item);

    if (items.length === 1) {
      return [
        `👟 Producto: ${itemName}`,
        `📏 Talla: ${size}`,
        `🎨 Color: ${color}`,
        `🔢 Cantidad: ${item.quantity}`,
        `💰 Precio unitario: ${copFormatter.format(item.unitPrice)}`
      ].join("\n");
    }

    return [
      `👟 ${item.quantity} x ${itemName}`,
      `   📏 Talla: ${size} · 🎨 Color: ${color}`,
      `   💰 Subtotal: ${copFormatter.format(item.unitPrice * item.quantity)}`
    ].join("\n");
  });

  return ["*Pedido*", ...orderLines, `💵 *Total: ${copFormatter.format(total)}*`].join("\n");
}

export function buildCodWhatsAppMessage({
  customer,
  items,
  total
}: BuildCodWhatsAppMessageOptions) {
  const cleanCustomer = {
    name: sanitizeText(customer.name),
    phone: sanitizeText(customer.phone),
    city: sanitizeText(customer.city),
    department: sanitizeText(customer.department),
    address: sanitizeText(customer.address),
    reference: sanitizeText(customer.reference) || "No especificada",
    observations: sanitizeText(customer.observations) || "Ninguna"
  };

  const customerSection = [
    "*Datos del cliente*",
    `👤 Nombre: ${cleanCustomer.name}`,
    `📞 Teléfono: ${cleanCustomer.phone}`,
    `📍 Ciudad: ${cleanCustomer.city}, ${cleanCustomer.department}`,
    `🏠 Dirección: ${cleanCustomer.address}`,
    `📌 Referencia: ${cleanCustomer.reference}`
  ].join("\n");

  const orderSection = buildOrderSection(items, total);

  return [
    "🛒 *NUEVO PEDIDO - PAGO CONTRA ENTREGA*",
    "",
    customerSection,
    "",
    orderSection,
    "",
    `📝 Observaciones: ${cleanCustomer.observations}`
  ].join("\n");
}
