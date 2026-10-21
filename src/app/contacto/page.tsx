import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import {
  INSTAGRAM_URL,
  TIKTOK_URL,
  WHATSAPP_DISPLAY_NUMBER,
  WHATSAPP_NUMBER,
  GOOGLE_MAPS_URL,
  STORE_ADDRESS
} from "@/lib/constants";

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Contacto</h1>
      <p className="text-[var(--muted-foreground)]">
        Escríbenos para asesoría personalizada de talla, estilo y compras
        corporativas.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <a
          href="mailto:larscalzado@gmail.com"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <Mail className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            Correo
          </p>
          <p className="mt-2 font-semibold">larscalzado@gmail.com</p>
        </a>
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <Phone className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            Teléfono
          </p>
          <p className="mt-2 font-semibold">{WHATSAPP_DISPLAY_NUMBER}</p>
        </a>
        <a
          href="tel:+573229521433"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <Phone className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            Teléfono secundario
          </p>
          <p className="mt-2 font-semibold">322 952 1433</p>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <InstagramIcon className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            Instagram
          </p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold">
            @calzadolarcs
            <ExternalLink className="h-4 w-4" />
          </p>
        </a>

        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok de LARCS"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <TikTokIcon className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            TikTok
          </p>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold">
            @calzadolarcs
            <ExternalLink className="h-4 w-4" />
          </p>
        </a>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:border-[var(--primary)]"
        >
          <MapPin className="mb-2 h-5 w-5 text-[var(--primary)]" />
          <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            Ubicación
          </p>
          <p className="mt-2 font-semibold">{STORE_ADDRESS}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--primary)]">
            Ver en Google Maps
            <ExternalLink className="h-4 w-4" />
          </p>
        </a>
      </div>

      <ContactForm />
    </section>
  );
}
