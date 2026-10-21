import type { CategoryKey } from "@/types/product";

export const BRAND_NAME = "LARCS";
export const BRAND_LOGO_PURPLE = "/api/assets/Logos/LOGO%20LARCS%20MORADO.png";
export const BRAND_LOGO_BW = "/api/assets/Logos/LOGO%20LARCS%20BYN.png";
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573014594421").replace(/\D/g, "");
const nationalWhatsAppNumber = WHATSAPP_NUMBER.startsWith("57")
  ? WHATSAPP_NUMBER.slice(2)
  : WHATSAPP_NUMBER;
export const WHATSAPP_DISPLAY_NUMBER = nationalWhatsAppNumber.replace(
  /^(\d{3})(\d{3})(\d{4})$/,
  "$1 $2 $3"
);
export const ADDI_WHATSAPP_MESSAGE_BASE = "Hola, quiero pagar con ADDI";
export const INSTAGRAM_URL = "https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA==";
export const TIKTOK_URL = "https://www.tiktok.com/@calzadolarcs";
export const PICKUP_DISCOUNT_COPY =
  "Al recoger en nuestro punto físico tienes descuento. Lo gestionamos directamente en la tienda.";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  botas: "Botas",
  botines: "Botines",
  flats: "Flats",
  sandalias: "Sandalias",
  tacones: "Tacones"
};

export const SHIPPING_COST = 10000;

export const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYwJyBoZWlnaHQ9JzE2MCcgdmlld0JveD0nMCAwIDE2MCAxNjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agc3RvcC1jb2xvcj0nI2Y0ZTZlMicvPjxzdG9wIG9mZnNldD0nMScgc3RvcC1jb2xvcj0nI2QzYjVhNicvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPScxNjAnIGhlaWdodD0nMTYwJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+";

// Dominio público de la tienda (SEO, sitemap y vistas previas al compartir). Se configura al publicar.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.larcs.co").replace(/\/+$/, "");

// Punto físico de la tienda y enlaces de mapas que llevan directo a la dirección.
export const STORE_ADDRESS = "Calle 18 Sur #24B-06, Bogotá";
const mapsQuery = encodeURIComponent(`${STORE_ADDRESS}, Colombia`);
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const WAZE_URL = `https://www.waze.com/ul?q=${mapsQuery}&navigate=yes`;
