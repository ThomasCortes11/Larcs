"use client";

import Link from "next/link";
import { startTransition, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import type { CategoryKey, Product } from "@/types/product";

interface HeroProps {
  products?: Product[];
}

const orderedCategories: CategoryKey[] = ["botines", "tacones", "mocasines", "botas", "sandalias"];

const categoryStories: Record<
  CategoryKey,
  {
    label: string;
    title: string;
    description: string;
    accent: string;
    note: string;
  }
> = {
  botas: {
    label: "Statement winter",
    title: "Botas con presencia editorial y estructura femenina.",
    description: "Disenos de impacto para clima fresco, styling urbano y una silueta mas poderosa.",
    accent: "var(--accent-orange)",
    note: "Envio nacional y asesoria de talla"
  },
  botines: {
    label: "Signature best seller",
    title: "Botines premium para una presencia impecable todos los dias.",
    description: "La linea mas versatil de LARCS, pensada para combinar comodidad real con una lectura sofisticada.",
    accent: "var(--primary)",
    note: "Best sellers con rotacion continua"
  },
  mocasines: {
    label: "Soft tailoring",
    title: "Mocasines que equilibran comodidad, elegancia y ritmo urbano.",
    description: "Ideales para jornadas largas, oficina o looks sobrios con un gesto contemporaneo.",
    accent: "var(--accent-green)",
    note: "Linea comoda para uso diario"
  },
  sandalias: {
    label: "Light season",
    title: "Sandalias ligeras con detalles que refinan cada paso.",
    description: "Opciones frescas para clima calido, escapadas, vacaciones y momentos especiales.",
    accent: "var(--secondary)",
    note: "Siluetas frescas con enfoque femenino"
  },
  tacones: {
    label: "Evening focus",
    title: "Tacones diseñados para eventos, oficina y ocasiones memorables.",
    description: "Altura, estabilidad y materiales seleccionados para una presencia segura y elegante.",
    accent: "var(--accent-rose)",
    note: "Pagos seguros y cambios faciles"
  }
};

function getFeaturedByCategory(products: Product[]) {
  return orderedCategories.reduce<Partial<Record<CategoryKey, Product>>>((accumulator, category) => {
    const candidate = products
      .filter((product) => product.category === category)
      .sort((first, second) => Number(second.isPromo) - Number(first.isPromo) || second.popularity - first.popularity)[0];

    if (candidate) {
      accumulator[category] = candidate;
    }

    return accumulator;
  }, {});
}

export function Hero({ products = [] }: HeroProps) {
  const featuredByCategory = useMemo(() => getFeaturedByCategory(products), [products]);
  const availableCategories = orderedCategories.filter((category) => featuredByCategory[category]);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(availableCategories[0] ?? "botines");

  const activeProduct = featuredByCategory[activeCategory] ?? featuredByCategory[availableCategories[0] ?? "botines"];
  const activeStory = categoryStories[activeCategory];

  if (!activeProduct) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff9fb_0%,color-mix(in_srgb,var(--background)_86%,white)_38%,#f7f0f4_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]" />
      <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--primary)_22%,transparent)] blur-3xl" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--secondary)_18%,transparent)] blur-3xl" />
      <div className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--accent-rose)_16%,transparent)] blur-3xl" />

      <div className="mx-auto grid min-h-[88vh] max-w-7xl gap-8 px-4 py-12 md:grid-cols-12 md:px-6 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col justify-center md:col-span-5"
        >
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[color-mix(in_srgb,var(--primary)_26%,white)] bg-[color-mix(in_srgb,var(--primary)_8%,white)] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[var(--muted-foreground)] backdrop-blur sm:text-[11px] sm:tracking-[0.28em]">
            <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
            LARCS Atelier Digital
          </div>

          <h1 className="brand-display mt-6 max-w-xl text-4xl leading-[0.94] text-[var(--foreground)] sm:text-6xl md:text-7xl">
            El par que transforma tu presencia empieza aqui.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted-foreground)] sm:text-base sm:leading-8 md:text-lg">
            Calzado femenino premium con una curaduria enfocada en botines, tacones, botas, mocasines y sandalias.
            Compra con envio nacional, pagos seguros y acompanamiento en talla.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/catalogo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-[linear-gradient(120deg,color-mix(in_srgb,var(--primary)_90%,white),color-mix(in_srgb,var(--secondary)_88%,white))] shadow-[0_16px_30px_-18px_var(--primary)]">
                Comprar coleccion
              </Button>
            </Link>
            <Link href={activeProduct.slug ? `/producto/${activeProduct.slug}` : "/catalogo"} className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full border-[color-mix(in_srgb,var(--primary)_22%,white)] bg-white/80">
                Ver producto destacado
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted-foreground)]">
            <span>Envio nacional</span>
            <span>Pago seguro</span>
            <span>Cambios faciles</span>
            <span>Asesoria de talla</span>
          </div>

          <div className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-5 sm:overflow-visible sm:px-0">
            {availableCategories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => startTransition(() => setActiveCategory(category))}
                  className={[
                    "shrink-0 rounded-full px-3 py-2 text-left text-xs uppercase tracking-[0.2em] transition-all duration-300 sm:rounded-none sm:px-0 sm:py-0 sm:pb-2 sm:text-sm",
                    isActive
                      ? "border border-[color-mix(in_srgb,var(--primary)_26%,white)] bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-[var(--foreground)] sm:border-b sm:border-x-0 sm:border-t-0 sm:bg-transparent"
                      : "border border-transparent bg-white/60 text-[var(--muted-foreground)] hover:text-[var(--foreground)] sm:border-b sm:border-x-0 sm:border-t-0 sm:bg-transparent"
                  ].join(" ")}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative z-10 md:col-span-7"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--primary)_18%,white)] bg-[linear-gradient(160deg,rgba(255,255,255,0.96)_0%,color-mix(in_srgb,var(--muted)_78%,white)_100%)] p-4 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.28)] md:rounded-[2.25rem] md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_32%),radial-gradient(circle_at_15%_85%,color-mix(in_srgb,var(--secondary)_12%,transparent),transparent_25%)]" />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--primary)]">{activeStory.label}</p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">{activeStory.description}</p>
              </div>
              <BrandLogo variant="bw" width={92} height={26} className="shrink-0" />
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[1.6rem] border border-[color-mix(in_srgb,var(--primary)_12%,white)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_34%,white),white)] px-4 py-8 sm:px-6 sm:py-10 md:mt-8 md:rounded-[1.9rem] md:px-10 md:py-12">
              <div
                className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-72 md:w-72"
                style={{ background: `color-mix(in srgb, ${activeStory.accent} 18%, white)` }}
              />
              <div className="absolute inset-x-[10%] inset-y-[8%] rounded-[5rem] border border-[color-mix(in_srgb,var(--foreground)_8%,white)] sm:inset-x-[14%] sm:rounded-[9rem]" />

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProduct.id}
                  src={activeProduct.imageUrls[0]}
                  alt={activeProduct.name}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="relative z-10 mx-auto max-h-[240px] w-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.18)] sm:max-h-[300px] md:max-h-[420px]"
                />
              </AnimatePresence>
            </div>

            <div className="relative z-10 mt-4 grid gap-4 md:mt-5 md:grid-cols-[1.15fr_0.85fr]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={`story-${activeCategory}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-[1.35rem] border border-[var(--border)] bg-white/88 p-4 sm:p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{CATEGORY_LABELS[activeCategory]}</p>
                  <h2 className="brand-display mt-3 max-w-md text-2xl leading-tight text-[var(--foreground)] sm:text-3xl">
                    {activeStory.title}
                  </h2>
                  <div className="mt-5 flex flex-wrap items-end gap-3">
                    <p className="text-xl font-semibold text-[var(--foreground)]">{toCurrency(activeProduct.price)}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{activeStory.note}</p>
                  </div>
                </motion.article>
              </AnimatePresence>

              <Link
                href={`/producto/${activeProduct.slug}`}
                className="flex items-end justify-between rounded-[1.35rem] border border-[color-mix(in_srgb,var(--secondary)_24%,white)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--secondary)_12%,white),color-mix(in_srgb,var(--muted)_62%,white))] p-4 transition hover:border-[var(--primary)] sm:p-5"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Producto destacado</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">{activeProduct.name}</p>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                    Tallas {activeProduct.variant.sizes.slice(0, 4).join(" - ")}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--foreground)]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
