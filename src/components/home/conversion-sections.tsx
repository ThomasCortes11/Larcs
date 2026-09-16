"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Mail, MapPin, Navigation, Phone, ShieldCheck, Truck, Undo2 } from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Button } from "@/components/ui/button";
import mapsImage from "@/Img/Logos/Maps.jpeg";

const locationLinks = {
  googleMaps: "https://www.google.com/maps/search/?api=1&query=Calzado+LARCS+Bogota+Colombia",
  waze: "https://www.waze.com/ul?q=Calzado%20LARCS%20Bogota%20Colombia&navigate=yes"
};

const benefits = [
  {
    title: "Envio rapido nacional",
    detail: "Despachos priorizados en principales ciudades de Colombia.",
    icon: Truck
  },
  {
    title: "Pago 100% seguro",
    detail: "Arquitectura preparada para Stripe, Mercado Pago, Wompi y PayU.",
    icon: ShieldCheck
  },
  {
    title: "Cambios sencillos",
    detail: "Politica clara para cambios de talla y referencias.",
    icon: Undo2
  }
];

export function ConversionSections() {
  return (
    <>
      <section className="mx-auto max-w-7xl space-y-5 px-4 py-10 md:px-6">
        <h2 className="text-2xl font-bold">Beneficios de comprar en LARCS</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-3xl border border-[var(--border)] bg-white p-5">
              <benefit.icon className="mb-3 h-6 w-6 text-[var(--primary)]" />
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">{benefit.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-8 md:px-6">
        <h2 className="text-2xl font-bold">Contacto directo</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="mailto:larscalzado@gmail.com"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <Mail className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Correo</p>
            <p className="mt-2 text-base font-semibold">larscalzado@gmail.com</p>
          </a>
          <a
            href="tel:+573014594421"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <Phone className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Contacto</p>
            <p className="mt-2 text-base font-semibold">301 459 4421</p>
          </a>
          <a
            href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]"
          >
            <InstagramIcon className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instagram</p>
            <p className="mt-2 text-base font-semibold">@calzadolarcs</p>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-8 md:px-6">
        <h2 className="text-2xl font-bold">Instagram</h2>
        <div className="rounded-3xl border border-[var(--border)] bg-[linear-gradient(120deg,#f7e7df,#f2d8cb)] p-8">
          <p className="max-w-xl text-sm text-[var(--muted-foreground)]">
            Conecta con nuestra comunidad para lanzamientos, editoriales y promociones en tiempo real.
          </p>
          <a
            href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
          >
            <InstagramIcon className="h-4 w-4" />
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
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Ubicacion</p>
              <h2 className="mt-2 text-2xl font-bold">Visitanos en la zona exacta</h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">
                LARCS está ubicado en Bogotá y te lleva directo al punto más cercano para recoger o visitar la tienda.
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
                <p className="text-xs uppercase tracking-[0.18em] text-white/80">Calzado LARCS</p>
                <p className="mt-2 text-2xl font-semibold">Ruta exacta</p>
                <p className="mt-3 max-w-md text-sm text-white/90">Toca aquí para abrir la ubicación correcta y navegar directo al punto.</p>
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
