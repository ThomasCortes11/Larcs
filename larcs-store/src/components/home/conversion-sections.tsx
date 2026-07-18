import Link from "next/link";
import { ExternalLink, Mail, MapPin, Navigation, Phone, ShieldCheck, Truck, Undo2 } from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Button } from "@/components/ui/button";

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

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-5 rounded-3xl border border-[var(--border)] bg-white p-8 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary)]">Newsletter</p>
            <h2 className="mt-2 text-2xl font-bold">Recibe nuevos ingresos y promociones VIP</h2>
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Tu correo"
              className="h-11 flex-1 rounded-full border border-[var(--border)] px-4 text-sm"
              aria-label="Correo newsletter"
            />
            <Button>Unirme</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold">Ubicacion</h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">
                Visitanos o abre la ruta en tu app favorita para llegar directo a Calzado LARCS.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white"
                >
                  <MapPin className="h-4 w-4" />
                  Abrir en Google Maps
                </a>
                <a
                  href="https://waze.com/ul?ll=4.7110,-74.0721&navigate=yes"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold"
                >
                  <Navigation className="h-4 w-4" />
                  Abrir en Waze
                </a>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-[var(--border)] bg-[radial-gradient(circle_at_30%_20%,#ffd7cd,#f5b39f_35%,#e27f60_100%)] p-6 text-white"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/85">Calzado LARCS</p>
              <p className="mt-2 text-2xl font-semibold">Ver mapa interactivo</p>
              <p className="mt-3 text-sm text-white/90">Toca aqui para abrir la ubicacion exacta en Maps.</p>
              <ExternalLink className="mt-6 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
