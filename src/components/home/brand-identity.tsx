import Image from "next/image";
import { BadgeCheck, HeartHandshake, MapPin } from "lucide-react";

import { CountUp, StoryParagraphs } from "@/components/home/brand-story-parts";
import { BRAND_LOGO_PURPLE } from "@/lib/constants";
import { BRAND_IDENTITY_CONTENT } from "@/lib/brand-content";

interface BrandIdentityProps {
  variant?: "full" | "compact";
  headingLevel?: "h1" | "h2";
  // Fotos de producto para el arco (inicio). Sin fotos se muestra solo el logo.
  images?: string[];
}

export function BrandIdentity({
  variant = "full",
  headingLevel = "h2",
  images = []
}: BrandIdentityProps) {
  if (variant === "compact") {
    return (
      <section
        aria-label="Identidad de la empresa"
        className="max-w-xs space-y-2 text-center lg:text-left"
      >
        <h2 className="text-base leading-snug font-bold text-[var(--foreground)]">
          {BRAND_IDENTITY_CONTENT.footerTitle}
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          {BRAND_IDENTITY_CONTENT.footerTagline}
        </p>
      </section>
    );
  }

  const Heading = headingLevel;

  return (
    <section
      aria-labelledby="brand-identity-title"
      className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:gap-10 sm:py-20 md:grid-cols-2 md:px-6 lg:gap-16"
    >
      <div className="min-w-0">
        <p className="brand-display text-4xl leading-none text-[var(--primary)] sm:text-5xl lg:text-6xl">
          {BRAND_IDENTITY_CONTENT.badge}
        </p>
        <Heading
          id="brand-identity-title"
          className="brand-display mt-4 max-w-xl text-3xl leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
        >
          {BRAND_IDENTITY_CONTENT.title}
        </Heading>
        <StoryParagraphs paragraphs={BRAND_IDENTITY_CONTENT.paragraphs} />

        <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[var(--border)] py-4">
          <article className="pr-2 sm:pr-4">
            <HeartHandshake
              className="mb-2 h-4 w-4 text-[var(--primary)]"
              aria-hidden="true"
            />
            <p className="brand-display text-xl text-[var(--foreground)] sm:text-2xl">
              <CountUp value={30} prefix="+" />
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
              años de experiencia
            </p>
          </article>
          <article className="border-l border-[var(--border)] px-3 sm:px-5">
            <MapPin
              className="mb-2 h-4 w-4 text-[var(--primary)]"
              aria-hidden="true"
            />
            <p className="brand-display text-xl text-[var(--foreground)] sm:text-2xl">
              <CountUp value={100} suffix="%" />
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
              colombiana
            </p>
          </article>
          <article className="border-l border-[var(--border)] pl-3 sm:pl-5">
            <BadgeCheck
              className="mb-2 h-4 w-4 text-[var(--primary)]"
              aria-hidden="true"
            />
            <p className="brand-display text-lg text-[var(--foreground)] sm:text-xl">
              Familiar
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted-foreground)] sm:text-sm">
              hecho con oficio
            </p>
          </article>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-none">
          {/* Arco vertical: en una sola columna no se estira a lo ancho. */}
          <div className="relative isolate aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl border border-[var(--border)] md:aspect-auto md:min-h-[620px] md:rounded-t-[12rem]">
            <Image
              src={images[0]}
              alt="Calzado LARCS hecho en Colombia"
              fill
              sizes="(max-width: 768px) 92vw, 46vw"
              className="object-cover object-[center_70%] transition duration-[1.2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(28,26,27,0.55))]" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 text-white sm:p-7">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/95 p-2 shadow-lg sm:h-16 sm:w-16">
                <Image src={BRAND_LOGO_PURPLE} alt="" width={64} height={64} className="h-full w-full object-contain" />
              </span>
              <div>
                <p className="brand-display text-xl leading-tight sm:text-2xl">Hecho en Colombia</p>
                <p className="text-xs text-white/85 sm:text-sm">{BRAND_IDENTITY_CONTENT.footerTagline}</p>
              </div>
            </div>
          </div>
          {images[1] ? (
            <div className="absolute -left-3 top-10 hidden h-44 w-36 overflow-hidden rounded-2xl border-4 border-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] sm:block md:-left-8 md:h-52 md:w-40 lg:-left-12">
              <Image src={images[1]} alt="" fill sizes="160px" className="object-cover" />
            </div>
          ) : null}
        </div>
      ) : (
        <div
          role="img"
          aria-label="Logo LARCS"
          className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-[var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--muted)_78%,white),color-mix(in_srgb,var(--accent-rose)_18%,white))] sm:min-h-[520px] md:min-h-[620px]"
        >
          <Image
            src={BRAND_LOGO_PURPLE}
            alt=""
            width={280}
            height={280}
            priority={headingLevel === "h1"}
            className="h-44 w-44 object-contain drop-shadow-[0_18px_30px_rgba(92,48,76,0.12)] sm:h-56 sm:w-56 md:h-64 md:w-64"
          />
        </div>
      )}
    </section>
  );
}
