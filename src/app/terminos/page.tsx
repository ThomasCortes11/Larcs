import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CreditCard,
  FileText,
  Gavel,
  Headset,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck
} from "lucide-react";

import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { LEGAL_INFO, legalIdentity } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio y de compra en Calzado Larcs."
};

// Redactado con base en la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 2439 de 2024.
// Recomendado: revisión de un abogado del cliente antes de publicar cambios.
const link = (href: string, text: string) => (
  <Link href={href} className="font-medium text-[var(--primary)] hover:underline">
    {text}
  </Link>
);

const sections: LegalSection[] = [
  {
    id: "aceptacion",
    title: "Aceptación",
    icon: FileText,
    blocks: [
      `Estos términos regulan el uso de este sitio web y las compras que realices en ${LEGAL_INFO.brandName}. Al navegar o comprar en el sitio aceptas estas condiciones, junto con nuestras Políticas y nuestra Política de tratamiento de datos personales.`,
      "Te recomendamos leerlos antes de comprar. Si no estás de acuerdo con alguno de ellos, por favor no realices la compra y contáctanos para resolver tus dudas."
    ]
  },
  {
    id: "quienes-somos",
    title: "Quiénes somos",
    icon: Store,
    blocks: [
      `El sitio es operado por ${legalIdentity()}. Puedes comunicarte con nosotros al correo ${LEGAL_INFO.email} o a los teléfonos y WhatsApp ${LEGAL_INFO.phones.join(" y ")}.`
    ]
  },
  {
    id: "productos",
    title: "Productos e información",
    icon: Package,
    blocks: [
      "Publicamos la información de cada producto de forma clara y veraz: nombre, referencia, precio, tallas, colores y características disponibles.",
      "Las fotografías son de nuestros productos reales. Los colores pueden variar ligeramente según la pantalla de cada dispositivo.",
      "Algunos modelos están disponibles para entrega inmediata y otros se fabrican bajo pedido. La disponibilidad puede cambiar; si un producto que compraste no está disponible, te lo informaremos de inmediato y podrás escoger otro producto o solicitar la devolución de tu dinero."
    ]
  },
  {
    id: "precios-y-pagos",
    title: "Precios y medios de pago",
    icon: CreditCard,
    blocks: [
      "Los precios están expresados en pesos colombianos (COP). El valor del envío se muestra antes de finalizar la compra y se suma al total.",
      "Puedes pagar con:",
      {
        list: [
          "Wompi: pago en línea a través de la plataforma de pagos de Wompi, con los medios que esta tenga habilitados (por ejemplo, tarjetas débito y crédito y billeteras digitales). Tus datos de pago los procesa directamente Wompi; nosotros no conocemos ni guardamos los datos de tus tarjetas.",
          "ADDI: compra ahora y paga después, sujeto a la aprobación de ADDI. Un asesor te acompaña por WhatsApp.",
          "Pago contra entrega: pagas al recibir tu pedido. Confirmamos la compra contigo por WhatsApp antes del despacho.",
          "Recoger en tienda: coordinas el pedido por WhatsApp y lo recoges en nuestro punto físico."
        ]
      },
      "Nos reservamos el derecho de corregir errores evidentes de precio o información. Si esto afecta un pedido ya realizado, te contactaremos para que decidas si continúas con la compra o te devolvemos el dinero."
    ]
  },
  {
    id: "proceso-de-compra",
    title: "Proceso de compra",
    icon: ShoppingBag,
    blocks: [
      "Antes de pagar podrás revisar el resumen de tu pedido: productos, tallas, colores, cantidades, valor del envío y total.",
      "Con Wompi, la compra queda confirmada cuando el pago es aprobado; verás el resultado en pantalla con la referencia y el número de transacción, y recibirás el comprobante de Wompi en tu correo. Con ADDI, contra entrega o recogida en tienda, la compra se confirma cuando te contactamos por WhatsApp.",
      "Te pedimos datos correctos y completos de contacto y envío. No nos hacemos responsables por retrasos causados por datos incorrectos."
    ]
  },
  {
    id: "envios",
    title: "Envíos y entregas",
    icon: Truck,
    blocks: [
      <>
        Hacemos envíos a toda Colombia. Antes de finalizar tu compra te informamos el plazo estimado de entrega; las condiciones
        completas están en nuestros {link("/politicas#plazos-de-entrega", "plazos de entrega")}.
      </>,
      "Si no se informa un plazo, la entrega se hará dentro del término máximo que establece la ley para las ventas por medios electrónicos (treinta días calendario). Si no podemos entregar en el plazo acordado, podrás retractarte de la compra y recibir la devolución total de tu dinero."
    ]
  },
  {
    id: "retracto",
    title: "Derecho de retracto",
    icon: RotateCcw,
    blocks: [
      <>
        Como compraste a distancia, tienes derecho a retractarte de tu compra dentro de los cinco (5) días hábiles siguientes a
        la entrega del producto, conforme al artículo 47 de la Ley 1480 de 2011. Conoce cómo hacerlo en nuestra{" "}
        {link("/politicas#derecho-de-retracto", "política de retracto")}.
      </>
    ]
  },
  {
    id: "garantia",
    title: "Garantía",
    icon: BadgeCheck,
    blocks: [
      <>
        Nuestros productos cuentan con la garantía legal por defectos de fabricación, materiales o ensamblaje. Consulta las
        condiciones en nuestra {link("/politicas#garantia", "política de garantía")}.
      </>
    ]
  },
  {
    id: "reversion-del-pago",
    title: "Reversión del pago",
    icon: CreditCard,
    blocks: [
      "Si pagaste con tarjeta u otro medio electrónico, puedes solicitar la reversión del pago, conforme al artículo 51 de la Ley 1480 de 2011, cuando seas víctima de fraude, la operación no haya sido solicitada, no recibas el producto, o este no corresponda a lo pedido o sea defectuoso.",
      `Para hacerlo, dentro de los cinco (5) días hábiles siguientes a cuando conociste la situación o debiste recibir el producto, presenta tu queja a ${LEGAL_INFO.brandName} por nuestros canales oficiales, devuelve el producto cuando aplique y avisa a la entidad emisora de tu medio de pago.`
    ]
  },
  {
    id: "propiedad-intelectual",
    title: "Propiedad intelectual",
    icon: ShieldCheck,
    blocks: [
      `La marca ${LEGAL_INFO.brandName}, el logo, las fotografías, los textos y los diseños de este sitio nos pertenecen o los usamos con autorización. No está permitido copiarlos, modificarlos o usarlos con fines comerciales sin nuestra autorización previa y por escrito.`
    ]
  },
  {
    id: "uso-del-sitio",
    title: "Uso del sitio",
    icon: FileText,
    blocks: [
      "Te comprometes a usar el sitio de forma lícita y a no realizar acciones que afecten su funcionamiento o la seguridad de otros usuarios.",
      "Trabajamos para que el sitio esté disponible y funcione correctamente, pero pueden presentarse interrupciones por mantenimiento o causas ajenas a nosotros."
    ]
  },
  {
    id: "datos-personales",
    title: "Datos personales",
    icon: ShieldCheck,
    blocks: [
      <>
        Tratamos tus datos personales de acuerdo con la Ley 1581 de 2012 y nuestra{" "}
        {link("/privacidad", "Política de tratamiento de datos personales")}.
      </>
    ]
  },
  {
    id: "atencion",
    title: "Atención al cliente",
    icon: Headset,
    blocks: [
      `Para peticiones, quejas, reclamos o solicitudes de garantía y retracto, escríbenos a ${LEGAL_INFO.email} o por WhatsApp al ${LEGAL_INFO.phones[0]}. Te responderemos dentro de los términos que establece la ley.`,
      "Si consideras que no atendimos adecuadamente tu solicitud, puedes acudir a la Superintendencia de Industria y Comercio (www.sic.gov.co)."
    ]
  },
  {
    id: "ley-aplicable",
    title: "Ley aplicable y cambios",
    icon: Gavel,
    blocks: [
      "Estos términos se rigen por las leyes de la República de Colombia, en especial la Ley 1480 de 2011 (Estatuto del Consumidor) y sus modificaciones.",
      "Podemos actualizar estos términos. Los cambios aplican a las compras realizadas después de su publicación en este sitio."
    ]
  }
];

export default function TerminosPage() {
  return (
    <LegalDocument
      title="Términos y condiciones"
      intro="Condiciones de uso del sitio y de compra en Calzado Larcs."
      sections={sections}
    />
  );
}
