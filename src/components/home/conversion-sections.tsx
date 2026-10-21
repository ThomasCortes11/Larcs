"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone
} from "lucide-react";

import { GUARANTEES } from "@/components/legal/purchase-guarantees";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import {
  INSTAGRAM_URL,
  TIKTOK_URL,
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_NUMBER,
  GOOGLE_MAPS_URL,
  WAZE_URL
} from "@/lib/constants";
import mapsImage from "@/Img/Logos/Maps.jpeg";

const locationLinks = {
  googleMaps: GOOGLE_MAPS_URL,
  waze: WAZE_URL
};

export function ConversionSections() {
  return (
    <>
      <section className="mx-auto max-w-7xl space-y-5 px-4 py-10 md:px-6">
        <h2 className="text-2xl font-bold">Beneficios de comprar en LARCS</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GUARANTEES.map(({ href, icon: Icon, title, detail }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-3xl border border-[var(--border)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:shadow-[0_18px_40px_-30px_var(--primary)] sm:p-5"
            >
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,white)] text-[var(--primary)]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 flex-1 text-sm text-[var(--muted-foreground)]">
                {detail}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">
                Ver política
                <ChevronRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-8 md:px-6">
        <h2 className="text-2xl font-bold">Contacto directo</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <a
            href="mailto:larscalzado@gmail.com"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <Mail className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              Correo
            </p>
            <p className="mt-2 text-base font-semibold">
              larscalzado@gmail.com
            </p>
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <Phone className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              Contacto
            </p>
            <p className="mt-2 text-base font-semibold">
              {WHATSAPP_DISPLAY_NUMBER}
            </p>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <InstagramIcon className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              Instagram
            </p>
            <p className="mt-2 text-base font-semibold">@calzadolarcs</p>
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de LARCS"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <TikTokIcon className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
              TikTok
            </p>
            <p className="mt-2 text-base font-semibold">@calzadolarcs</p>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-8 md:px-6">
        <h2 className="text-2xl font-bold">Instagram</h2>
        <div className="rounded-3xl border border-[var(--border)] bg-[linear-gradient(120deg,#f7e7df,#f2d8cb)] p-8">
          <p className="max-w-xl text-sm text-[var(--muted-foreground)]">
            Conecta con nuestra comunidad para lanzamientos, editoriales y
            promociones en tiempo real.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
          >
            <InstagramIcon className="h-4 w-4" />
            @calzadolarcs
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de LARCS"
            className="mt-4 ml-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
          >
            <TikTokIcon className="h-4 w-4" />
            @calzadolarcs
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_25px_60px_-42px_var(--ink-black)] md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-center">
            <div>
              <p className="text-xs tracking-[0.2em] text-[var(--primary)] uppercase">
                Ubicación
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Visitanos en la zona exacta
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">
                LARCS está ubicado en Bogotá y te lleva directo al punto más
                cercano para recoger o visitar la tienda.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={locationLinks.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-[0_14px_26px_-18px_var(--primary)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4" />
                  Abrir en Google Maps
                </a>
                <a
                  href={locationLinks.waze}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Navigation className="h-4 w-4" />
                  Abrir en Waze
                </a>
              </div>
            </div>
            <motion.a
              href={locationLinks.googleMaps}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative block min-h-[250px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--foreground)] shadow-[0_24px_60px_-34px_rgba(211,108,93,0.95)] sm:min-h-[290px]"
            >
              <Image
                src={mapsImage}
                alt="Mapa de ubicación de Calzado LARCS"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,15,20,0.04)_15%,rgba(25,15,20,0.82)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs tracking-[0.18em] text-white/80 uppercase">
                  Calzado LARCS
                </p>
                <p className="mt-2 text-2xl font-semibold">Ruta exacta</p>
                <p className="mt-3 max-w-md text-sm text-white/90">
                  Toca aquí para abrir la ubicación correcta y navegar directo
                  al punto.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                  <span>Ir ahora</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
