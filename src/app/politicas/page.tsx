import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, ShieldCheck, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Políticas",
  description: "Garantía, plazos de entrega y atención de defectos de fabricación de Calzado Larcs."
};

// Textos legales entregados por Calzado Larcs. Cambiarlos solo con aprobación del cliente.
const sections = [
  {
    id: "garantia",
    icon: ShieldCheck,
    title: "Garantía de Calzado Larcs",
    paragraphs: [
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
    paragraphs: [
      "En Calzado Larcs ofrecemos productos disponibles para entrega y calzado fabricado bajo pedido. El tiempo de entrega depende del modelo, la disponibilidad y el destino.",
      "Antes de finalizar tu compra, te informaremos el plazo estimado aplicable a tu pedido. Si surge algún inconveniente, te comunicaremos oportunamente la novedad y las alternativas disponibles.",
      "Los pedidos se entregarán dentro del plazo acordado y conforme a la legislación colombiana. Si no se informa un plazo, se aplicará el término legal correspondiente."
    ]
  },
  {
    id: "defectos-de-fabricacion",
    icon: Wrench,
    title: "Defectos de fabricación",
    paragraphs: [
      "Si recibes tu calzado con una posible falla de fabricación, comunícate con Calzado Larcs por nuestros canales oficiales e indica tu número de pedido y la novedad presentada.",
      "Podremos solicitar fotografías y revisar el producto para determinar el origen del defecto. Los daños derivados del uso indebido, accidentes o mantenimiento inadecuado no estarán cubiertos cuando se demuestre que esa es su causa.",
      "Si se confirma un defecto cubierto por la garantía, procederemos conforme a la ley según corresponda."
    ]
  }
];

export default function PoliticasPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 md:px-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Información legal</p>
        <h1 className="text-3xl font-bold">Políticas</h1>
        <p className="text-[var(--muted-foreground)]">
          Garantía, plazos de entrega y atención de defectos de fabricación para tus compras en Calzado Larcs.
        </p>
      </div>

      <nav aria-label="Secciones de las políticas" className="flex flex-wrap gap-2">
        {sections.map(({ id, title }) => (
          <a
            key={id}
            href={`#${id}`}
            className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--border)] bg-white px-4 text-sm font-medium transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            {title}
          </a>
        ))}
      </nav>

      <div className="space-y-5">
        {sections.map(({ id, icon: Icon, title, paragraphs }) => (
          <article
            key={id}
            id={id}
            className="scroll-mt-28 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_18px_40px_-36px_var(--ink-black)] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-7 text-[var(--muted-foreground)]">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>

      <p className="text-sm text-[var(--muted-foreground)]">
        ¿Tienes alguna duda?{" "}
        <Link href="/contacto" className="font-semibold text-[var(--primary)] hover:underline">
          Escríbenos por nuestros canales oficiales
        </Link>
        .
      </p>
    </section>
  );
}
