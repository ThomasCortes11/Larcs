"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, RefreshCw, Ruler, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { BLUR_PLACEHOLDER, BRAND_LOGO_PURPLE, CATEGORY_LABELS } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";
import type { CategoryKey, Product } from "@/types/product";

interface HeroProps {
  products?: Product[];
}

const orderedCategories: CategoryKey[] = ["botines", "tacones", "botas", "sandalias", "flats"];

const trustPoints = [
  { icon: Truck, label: "Envío nacional" },
  { icon: ShieldCheck, label: "Pago seguro" },
  { icon: RefreshCw, label: "Cambios fáciles" },
  { icon: Ruler, label: "Asesoría de talla" }
];

// Cada cuánto cambian las fotos de los arcos.
const ROTATION_MS = 4500;

// Los productos más populares de cada categoría, con foto: alimentan los arcos.
function getShowcase(products: Product[]) {
  return orderedCategories
    .map((category) =>
      products
        .filter((product) => product.category === category && product.imageUrls[0])
        .sort((first, second) => Number(second.isPromo) - Number(first.isPromo) || second.popularity - first.popularity)[0]
    )
    .filter((product): product is Product => Boolean(product));
}

// Un arco con su foto. Al cambiar de producto, la foto se funde y se acerca despacio.
function Arch({
  product,
  className,
  sizes,
  priority = false
}: {
  product: Product;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-t-full rounded-b-[2rem] bg-[color-mix(in_srgb,var(--muted)_70%,white)] shadow-[0_40px_80px_-40px_rgba(92,48,76,0.55)] ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: ROTATION_MS / 1000 + 1.5, ease: "easeOut" } }}
          className="absolute inset-0"
        >
          <Image
            src={product.imageUrls[0] ?? BLUR_PLACEHOLDER}
            alt={product.name}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[2rem] ring-1 ring-inset ring-white/40" />
    </div>
  );
}

// Sello circular que gira: "Más de 30 años · Hecho en Colombia".
function SpinningSeal({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <div className="relative h-full w-full rounded-full bg-white/90 shadow-[0_18px_40px_-20px_rgba(92,48,76,0.6)] backdrop-blur">
        <svg viewBox="0 0 120 120" className="hero-seal absolute inset-0 h-full w-full">
          <defs>
            <path id="hero-seal-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text className="fill-[var(--primary)] text-[10px] font-semibold">
            <textPath href="#hero-seal-path" textLength="286" lengthAdjust="spacing">
              MÁS DE 30 AÑOS · HECHO EN COLOMBIA ·
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-[30%]">
          <Image src={BRAND_LOGO_PURPLE} alt="" fill sizes="48px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

export function Hero({ products = [] }: HeroProps) {
  const showcase = useMemo(() => getShowcase(products), [products]);
  const [tick, setTick] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || showcase.length < 2) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, showcase.length]);

  if (showcase.length === 0) return null;

  // Cada arco muestra un producto distinto y van rotando juntos.
  const at = (offset: number) => showcase[(tick + offset) % showcase.length];
  const center = at(0);

  const textIn = (delay: number) =>
    reduceMotion
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff9fb_0%,color-mix(in_srgb,var(--background)_86%,white)_45%,#f7eef3_100%)]">
        {/* Luces de color de fondo */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--secondary)_18%,transparent)] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-12 sm:pt-16 md:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12">
          {/* Arcos con fotos (en celular van primero) */}
          <div className="relative lg:order-2 lg:col-span-7">
            <div className="relative mx-auto flex max-w-xl items-end justify-center gap-3 sm:gap-4 lg:max-w-none">
              <motion.div
                className="w-[27%]"
                {...(reduceMotion ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.15 } })}
              >
                <Arch product={at(1)} className="hero-float-slow aspect-[3/5]" sizes="(max-width: 1024px) 28vw, 16vw" />
              </motion.div>
              <motion.div
                className="relative w-[40%] -translate-y-4 sm:-translate-y-10"
                {...(reduceMotion ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } })}
              >
                <Arch product={center} className="hero-float aspect-[3/5]" sizes="(max-width: 1024px) 42vw, 24vw" priority />
                <Link
                  href={`/producto/${center.slug}`}
                  className="group absolute -bottom-5 left-1/2 z-10 flex w-max max-w-[150%] -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/95 py-1.5 pl-4 pr-1.5 text-xs shadow-[0_16px_34px_-16px_rgba(0,0,0,0.4)] backdrop-blur transition hover:-translate-y-0.5 sm:text-sm"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={center.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      <span className="font-semibold">{center.name}</span>
                      <span className="text-[var(--primary)]">{toCurrency(center.price)}</span>
                    </motion.span>
                  </AnimatePresence>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white transition group-hover:rotate-45 sm:h-8 sm:w-8">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                className="w-[27%]"
                {...(reduceMotion ? {} : { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.3 } })}
              >
                <Arch product={at(2)} className="hero-float-slow aspect-[3/5] [animation-delay:-3s]" sizes="(max-width: 1024px) 28vw, 16vw" />
              </motion.div>

              <SpinningSeal className="absolute -top-2 right-0 h-20 w-20 sm:h-28 sm:w-28 lg:-right-2 lg:top-2" />
            </div>
          </div>

          {/* Texto */}
          <div className="relative z-10 text-center lg:order-1 lg:col-span-5 lg:text-left">
            <motion.p
              {...textIn(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_26%,white)] bg-white/70 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-[var(--muted-foreground)] backdrop-blur sm:text-[11px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
              Calzado femenino · Hecho en Colombia
            </motion.p>

            <motion.h1
              {...textIn(0.15)}
              className="brand-display mx-auto mt-5 max-w-xl text-[2.35rem] leading-[1.02] text-[var(--foreground)] sm:text-6xl lg:mx-0 lg:text-[3.4rem] xl:text-[3.8rem]"
            >
              El par que transforma tu presencia{" "}
              <span className="bg-[linear-gradient(120deg,var(--primary),var(--secondary))] bg-clip-text text-transparent">
                empieza aquí.
              </span>
            </motion.h1>

            <motion.p
              {...textIn(0.25)}
              className="mx-auto mt-5 max-w-md text-sm leading-6 text-[var(--muted-foreground)] sm:text-base sm:leading-7 lg:mx-0 lg:text-lg lg:leading-8"
            >
              Botines, tacones, botas, sandalias y flats con diseño premium. Te asesoramos en la talla y te lo enviamos
              a toda Colombia.
            </motion.p>

            <motion.div {...textIn(0.35)} className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/catalogo" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full gap-2 bg-[linear-gradient(120deg,color-mix(in_srgb,var(--primary)_92%,white),color-mix(in_srgb,var(--secondary)_88%,white))] px-8 shadow-[0_18px_34px_-18px_var(--primary)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Comprar colección
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </Button>
              </Link>
              <Link href={`/producto/${center.slug}`} className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full bg-white/80 px-8 transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
                  Ver destacado
                </Button>
              </Link>
            </motion.div>

            <motion.ul
              {...textIn(0.45)}
              className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-x-4 gap-y-3 text-left text-xs text-[var(--muted-foreground)] sm:max-w-none sm:grid-cols-4 sm:text-sm lg:mx-0 lg:grid-cols-2"
            >
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-[0_6px_14px_-10px_var(--primary)]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...textIn(0.55)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-xs text-[var(--muted-foreground)]"
            >
              <Image src="/api/assets/Logos/logo-addi.png" width={44} height={22} unoptimized alt="Logo de ADDI" className="h-5 w-10 object-contain" />
              Compra hoy y paga después con ADDI
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinta de categorías */}
      <nav aria-label="Categorías" className="overflow-hidden border-y border-[color-mix(in_srgb,var(--primary)_40%,white)] bg-[var(--primary)] py-3 text-white">
        <div className="hero-marquee flex w-max gap-8 hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-8" aria-hidden={copy === 1}>
              {orderedCategories.map((category) => (
                <Link
                  key={`${copy}-${category}`}
                  href={`/catalogo?categoria=${category}`}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="brand-display flex items-center gap-8 whitespace-nowrap text-lg uppercase tracking-[0.18em] transition hover:opacity-80 sm:text-xl"
                >
                  {CATEGORY_LABELS[category]}
                  <span className="text-sm opacity-70">✦</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
