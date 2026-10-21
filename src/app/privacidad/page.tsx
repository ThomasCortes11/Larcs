import type { Metadata } from "next";
import { Clock, Database, FileCheck, Lock, Mail, Share2, Target, UserCheck, Users } from "lucide-react";

import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { LEGAL_INFO, legalIdentity } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Tratamiento de datos personales",
  description: "Política de tratamiento de datos personales de Calzado Larcs (Ley 1581 de 2012)."
};

// Redactada con base en la Ley 1581 de 2012 y el Decreto 1074 de 2015 (contenido mínimo de la política).
// Recomendado: revisión de un abogado del cliente antes de publicar cambios.
const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable del tratamiento",
    icon: UserCheck,
    blocks: [
      `${legalIdentity()}. Correo: ${LEGAL_INFO.email}. Teléfonos y WhatsApp: ${LEGAL_INFO.phones.join(" y ")}.`,
      "Esta política explica cómo recolectamos, usamos, guardamos y protegemos tus datos personales, conforme a la Ley 1581 de 2012 y sus decretos reglamentarios."
    ]
  },
  {
    id: "datos",
    title: "Datos que recolectamos",
    icon: Database,
    blocks: [
      "Recolectamos únicamente los datos necesarios para atender tu compra y tus solicitudes:",
      {
        list: [
          "Datos de identificación y contacto: nombre, número de celular y correo electrónico.",
          "Datos de entrega: dirección, ciudad, departamento y punto de referencia.",
          "Datos de tu pedido: productos, tallas, colores, cantidades, valores, referencia de pago y estado de la transacción.",
          "Información guardada en tu propio navegador para que el sitio funcione, como tu carrito y tus favoritos."
        ]
      },
      "No recolectamos datos sensibles. Los datos de tus tarjetas los procesa directamente la pasarela de pagos (Wompi) o ADDI; nosotros no los conocemos ni los guardamos.",
      "Este sitio está dirigido a mayores de edad. No recolectamos intencionalmente datos de niñas, niños o adolescentes."
    ]
  },
  {
    id: "finalidades",
    title: "Para qué usamos tus datos",
    icon: Target,
    blocks: [
      {
        list: [
          "Procesar, confirmar, despachar y entregar tus pedidos.",
          "Comunicarnos contigo por WhatsApp, llamada o correo sobre tu compra, el pago, el envío, cambios, garantías y retractos.",
          "Atender tus peticiones, quejas y reclamos.",
          "Cumplir obligaciones legales, contables y tributarias.",
          "Enviarte novedades y promociones, solo si nos lo autorizas. Puedes pedir que dejemos de enviarlas en cualquier momento."
        ]
      }
    ]
  },
  {
    id: "autorizacion",
    title: "Autorización",
    icon: FileCheck,
    blocks: [
      "Al enviar tus datos en el formulario de pago, de contra entrega, de ADDI, de contacto o al escribirnos por WhatsApp, nos autorizas de forma previa, expresa e informada a tratarlos según esta política.",
      "Guardamos prueba de tu autorización y puedes revocarla cuando quieras, salvo que debamos conservar tus datos por una obligación legal o contractual."
    ]
  },
  {
    id: "terceros",
    title: "Con quién compartimos tus datos",
    icon: Share2,
    blocks: [
      "Solo compartimos los datos necesarios con quienes nos ayudan a prestarte el servicio, y les exigimos protegerlos:",
      {
        list: [
          "Wompi, para procesar los pagos en línea.",
          "ADDI, cuando escoges pagar con ADDI.",
          "Empresas de transporte y mensajería, para entregar tu pedido.",
          "WhatsApp (Meta), como canal de comunicación cuando nos escribes.",
          "Proveedores de alojamiento web y de tecnología que hacen funcionar este sitio."
        ]
      },
      "No vendemos ni alquilamos tus datos personales. Solo los entregaremos a autoridades cuando la ley lo exija."
    ]
  },
  {
    id: "derechos",
    title: "Tus derechos",
    icon: Users,
    blocks: [
      "Como titular de los datos tienes derecho a:",
      {
        list: [
          "Conocer, actualizar y rectificar tus datos personales.",
          "Solicitar prueba de la autorización que nos diste.",
          "Ser informado sobre el uso que les damos a tus datos.",
          "Revocar la autorización y pedir que eliminemos tus datos, cuando no exista un deber legal o contractual de conservarlos.",
          "Acceder gratuitamente a tus datos.",
          "Presentar quejas ante la Superintendencia de Industria y Comercio (www.sic.gov.co) por infracciones a la ley de protección de datos, después de haber agotado tu consulta o reclamo ante nosotros."
        ]
      }
    ]
  },
  {
    id: "consultas-y-reclamos",
    title: "Consultas y reclamos",
    icon: Mail,
    blocks: [
      `Para ejercer tus derechos, escríbenos a ${LEGAL_INFO.email} con tu nombre, tu número de celular, la descripción de lo que solicitas y, si aplica, los documentos que quieras hacer valer.`,
      {
        list: [
          "Consultas: te respondemos en un máximo de diez (10) días hábiles. Si no es posible, te avisaremos el motivo y responderemos en máximo cinco (5) días hábiles adicionales.",
          "Reclamos (corrección, actualización, supresión o incumplimiento): te respondemos en un máximo de quince (15) días hábiles. Si no es posible, te avisaremos el motivo y responderemos en máximo ocho (8) días hábiles adicionales. Si el reclamo está incompleto, te pediremos completarlo dentro de los cinco (5) días hábiles siguientes; si pasan dos (2) meses sin que lo completes, se entenderá que desististe."
        ]
      }
    ]
  },
  {
    id: "seguridad-y-conservacion",
    title: "Seguridad y conservación",
    icon: Lock,
    blocks: [
      "Aplicamos medidas técnicas y administrativas razonables para proteger tus datos contra pérdida, acceso no autorizado o uso indebido. Los pagos se realizan en la plataforma segura de Wompi.",
      "Conservamos tus datos mientras sean necesarios para las finalidades descritas y para cumplir nuestras obligaciones legales."
    ]
  },
  {
    id: "vigencia",
    title: "Vigencia y cambios",
    icon: Clock,
    blocks: [
      `Esta política rige desde el ${LEGAL_INFO.effectiveDate}. Si la cambiamos de forma sustancial, publicaremos la nueva versión en este sitio antes de aplicarla.`
    ]
  }
];

export default function PrivacidadPage() {
  return (
    <LegalDocument
      title="Tratamiento de datos personales"
      intro="Cómo recolectamos, usamos y protegemos tus datos personales en Calzado Larcs."
      sections={sections}
    />
  );
}
