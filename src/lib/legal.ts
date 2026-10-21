// Datos legales del negocio para Términos, Políticas y Tratamiento de datos.
// Completar NIT, razón social y dirección cuando el cliente los confirme: las páginas
// muestran cada dato solo si está lleno.

import { WHATSAPP_DISPLAY_NUMBER } from "@/lib/constants";

export const LEGAL_INFO = {
  brandName: "Calzado Larcs",
  legalName: "Calzado Larcs", // Razón social, tal como aparece en el RUT
  nit: "", // NIT o cédula con dígito de verificación
  city: "Bogotá D.C., Colombia",
  address: "Calle 18 Sur #24B-06", // Dirección del punto físico
  email: "larscalzado@gmail.com",
  phones: [WHATSAPP_DISPLAY_NUMBER, "322 952 1433"],
  // Fecha desde la que rigen los textos legales.
  effectiveDate: "21 de octubre de 2026"
} as const;

export function legalIdentity() {
  const parts: string[] = [LEGAL_INFO.legalName || LEGAL_INFO.brandName];
  if (LEGAL_INFO.nit) parts.push(`NIT ${LEGAL_INFO.nit}`);
  parts.push(LEGAL_INFO.address ? `${LEGAL_INFO.address}, ${LEGAL_INFO.city}` : LEGAL_INFO.city);
  return parts.join(" · ");
}
