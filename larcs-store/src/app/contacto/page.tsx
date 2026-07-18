import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/ui/instagram-icon";

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="text-[var(--muted-foreground)]">Escribenos para asesoria personalizada de talla, estilo y compras corporativas.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="mailto:larscalzado@gmail.com"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <Mail className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Correo</p>
          <p className="mt-2 font-semibold">larscalzado@gmail.com</p>
        </a>
        <a
          href="tel:+573014594421"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <Phone className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Telefono</p>
          <p className="mt-2 font-semibold">301 459 4421</p>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <InstagramIcon className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Instagram</p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold">
            @calzadolarcs
            <ExternalLink className="h-4 w-4" />
          </p>
        </a>

        <a
          href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <MapPin className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Ubicacion</p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold">
            Ver en Google Maps
            <ExternalLink className="h-4 w-4" />
          </p>
        </a>
      </div>
    </section>
  );
}
