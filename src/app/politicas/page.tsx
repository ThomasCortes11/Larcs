import type { Metadata } from "next";
import { CalendarClock, RotateCcw, ShieldCheck, Wrench } from "lucide-react";

import {
  LegalDocument,
  type LegalSection
} from "@/components/legal/legal-document";
import { LEGAL_INFO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Políticas",
  description:
    "Garantía, plazos de entrega, derecho de retracto y defectos de fabricación en Calzado Larcs."
};

// Garantía, plazos y defectos: textos entregados por Calzado Larcs (cambiarlos solo con su aprobación).
// Derecho de retracto: redactado con base en el art. 47 de la Ley 1480 de 2011 y la Ley 2439 de 2024.
const sections: LegalSection[] = [
  {
    id: "garantia",
    icon: ShieldCheck,
    title: "Garantía de Calzado Larcs",
    blocks: [
      "En Calzado Larcs nos comprometemos con la calidad de nuestros productos. El calzado nuevo cuenta con la garantía legal aplicable por defectos de fabricación, materiales o ensamblaje, conforme a la normativa colombiana vigente.",
      "La garantía no cubre daños ocasionados por uso indebido, accidentes, desgaste natural o cuidado inadecuado, cuando se demuestre que estos son la causa del daño y no exista un defecto cubierto.",
      "Para solicitarla, contáctanos por nuestros canales oficiales con el número de pedido y una descripción de la novedad. Podremos solicitar fotografías o revisar el producto para evaluar el caso.",
      "La garantía se atenderá sin costo para el consumidor cuando corresponda legalmente."
    ]
  },
  {
    id: "plazos-de-entrega",
    icon: CalendarClock,
    title: "Plazos de entrega",
    blocks: [
      "En Calzado Larcs ofrecemos productos disponibles para entrega y calzado fabricado bajo pedido. El tiempo de entrega depende del modelo, la disponibilidad y el destino.",
      "Antes de finalizar tu compra, te informaremos el plazo estimado aplicable a tu pedido. Si surge algún inconveniente, te comunicaremos oportunamente la novedad y las alternativas disponibles.",
      "Los pedidos se entregarán dentro del plazo acordado y conforme a la legislación colombiana. Si no se informa un plazo, se aplicará el término legal correspondiente."
    ]
  },
  {
    id: "derecho-de-retracto",
    icon: RotateCcw,
    title: "Derecho de retracto",
    blocks: [
      "Si compraste a través de este sitio, puedes retractarte de tu compra dentro de los cinco (5) días hábiles siguientes a la entrega del producto, conforme al artículo 47 de la Ley 1480 de 2011.",
      `Para hacerlo, escríbenos a ${LEGAL_INFO.email} o por WhatsApp al ${LEGAL_INFO.phones[0]} con tu número de pedido y los datos para la devolución del dinero. Debes devolver el producto por el mismo medio y en las mismas condiciones en que lo recibiste: sin uso, con su empaque y sus etiquetas. Los costos de transporte de la devolución están a tu cargo.`,
      "Te devolveremos la totalidad del dinero pagado, sin descuentos ni retenciones, en un plazo máximo de quince (15) días calendario contados desde que ejerciste el retracto, nos entregaste los datos correctos y devolviste el producto. La devolución se hará por el mismo medio de pago o por el que acordemos contigo.",
      "El retracto no aplica al calzado fabricado bajo pedido según tus especificaciones o claramente personalizado, conforme a la misma ley."
    ]
  },
  {
    id: "defectos-de-fabricacion",
    icon: Wrench,
    title: "Defectos de fabricación",
    blocks: [
      "Si recibes tu calzado con una posible falla de fabricación, comunícate con Calzado Larcs por nuestros canales oficiales e indica tu número de pedido y la novedad presentada.",
      "Podremos solicitar fotografías y revisar el producto para determinar el origen del defecto. Los daños derivados del uso indebido, accidentes o mantenimiento inadecuado no estarán cubiertos cuando se demuestre que esa es su causa.",
      "Si se confirma un defecto cubierto por la garantía, procederemos conforme a la ley según corresponda."
    ]
  }
];

export default function PoliticasPage() {
  return (
    <LegalDocument
      title="Políticas"
      intro="Garantía, plazos de entrega, derecho de retracto y atención de defectos de fabricación para tus compras en Calzado Larcs."
      sections={sections}
    />
  );
}
