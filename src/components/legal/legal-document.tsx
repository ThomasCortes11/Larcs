import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { LEGAL_INFO, legalIdentity } from "@/lib/legal";

// Un bloque es un párrafo o una lista con viñetas.
export type LegalBlock = ReactNode | { list: ReactNode[] };

export interface LegalSection {
  id: string;
  title: string;
  icon?: LucideIcon;
  blocks: LegalBlock[];
}

interface LegalDocumentProps {
  title: string;
  intro: string;
  sections: LegalSection[];
}

function isList(block: LegalBlock): block is { list: ReactNode[] } {
  return typeof block === "object" && block !== null && "list" in block;
}

// Plantilla común de las páginas legales: índice arriba y una tarjeta por sección.
export function LegalDocument({ title, intro, sections }: LegalDocumentProps) {
  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-10 md:px-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Información legal</p>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-[var(--muted-foreground)]">{intro}</p>
        <p className="text-xs text-[var(--muted-foreground)]">
          {legalIdentity()} · Vigente desde el {LEGAL_INFO.effectiveDate}
        </p>
      </div>

      {sections.length > 2 ? (
        <nav aria-label={`Secciones de ${title}`} className="flex flex-wrap gap-2">
          {sections.map(({ id, title: sectionTitle }) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-[40px] items-center rounded-full border border-[var(--border)] bg-white px-4 text-sm font-medium transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              {sectionTitle}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="space-y-5">
        {sections.map(({ id, icon: Icon, title: sectionTitle, blocks }) => (
          <article
            key={id}
            id={id}
            className="scroll-mt-28 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_18px_40px_-36px_var(--ink-black)] md:p-8"
          >
            <div className="flex items-center gap-3">
              {Icon ? (
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--primary)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              ) : null}
              <h2 className="text-2xl font-bold">{sectionTitle}</h2>
            </div>
            {blocks.map((block, index) =>
              isList(block) ? (
                <ul key={index} className="list-disc space-y-2 pl-5 leading-7 text-[var(--muted-foreground)] marker:text-[var(--primary)]">
                  {block.list.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={index} className="leading-7 text-[var(--muted-foreground)]">
                  {block}
                </p>
              )
            )}
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
