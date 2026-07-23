"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--primary)_20%,transparent),transparent_58%),linear-gradient(140deg,#fff_0%,#f9f4f6_45%,#f3ecef_100%)]">
      <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--accent-orange)_18%,white)] blur-3xl" />
      <div className="absolute bottom-4 right-10 h-32 w-32 rounded-full bg-[color-mix(in_srgb,var(--primary)_16%,white)] blur-3xl" />
      <div className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)]">Nueva Coleccion LARCS 2026</p>
          <h1 className="brand-display mt-4 text-4xl leading-tight text-[var(--foreground)] md:text-6xl">
            Elegancia contemporanea para cada paso.
          </h1>
          <p className="mt-5 max-w-xl text-base text-[var(--muted-foreground)] md:text-lg">
            Siluetas premium, comodidad impecable y detalles que transforman tu presencia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalogo">
              <Button size="lg" className="brand-display">Comprar ahora</Button>
            </Link>
            <Link href="/catalogo">
              <Button size="lg" variant="secondary">
                Ver coleccion
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-[var(--border)] bg-white/80 px-3 py-3 backdrop-blur">
              <p className="text-xl font-semibold">+120</p>
              <p className="text-xs text-[var(--muted-foreground)]">Modelos</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/80 px-3 py-3 backdrop-blur">
              <p className="text-xl font-semibold">24h</p>
              <p className="text-xs text-[var(--muted-foreground)]">Despacho</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/80 px-3 py-3 backdrop-blur">
              <p className="text-xl font-semibold">TOP</p>
              <p className="text-xs text-[var(--muted-foreground)]">Tendencia</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative h-[420px] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[0_28px_80px_-45px_var(--ink-black)]"
        >
          <div className="absolute inset-0 bg-[url('/api/assets/Logos/LOGO%20LARCS%20MORADO.png')] bg-contain bg-center bg-no-repeat opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-[color-mix(in_srgb,var(--secondary)_60%,white)]/80" />
          <div className="absolute left-6 top-6 rounded-2xl bg-white/70 px-4 py-3 backdrop-blur">
            <BrandLogo width={100} height={28} />
          </div>
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/85 px-5 py-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Premium edit</p>
            <p className="brand-display text-2xl">Coleccion Signature</p>
          </div>
          <div className="absolute bottom-6 right-6 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-right backdrop-blur">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--muted-foreground)]">Envio nacional</p>
            <p className="text-sm font-semibold">Cambios de talla faciles</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
