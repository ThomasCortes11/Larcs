import Image from "next/image";
import { BadgeCheck, HeartHandshake, MapPin } from "lucide-react";

import { BRAND_LOGO_PURPLE } from "@/lib/constants";
import { BRAND_IDENTITY_CONTENT } from "@/lib/brand-content";

interface BrandIdentityProps {
  variant?: "full" | "compact";
  headingLevel?: "h1" | "h2";
}

export function BrandIdentity({
  variant = "full",
  headingLevel = "h2"
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
        <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-[var(--muted-foreground)] sm:text-base sm:leading-8">
          {BRAND_IDENTITY_CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[var(--border)] py-4">
          <article className="pr-2 sm:pr-4">
            <HeartHandshake
              className="mb-2 h-4 w-4 text-[var(--primary)]"
              aria-hidden="true"
            />
            <p className="brand-display text-xl text-[var(--foreground)] sm:text-2xl">
              +30
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
              100%
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
    </section>
  );
}
