import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--accent-green)_20%,white),color-mix(in_srgb,var(--muted)_48%,white))]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandLogo variant="bw" className="inline-block" width={176} height={52} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
              Calzado femenino premium con esencia colombiana, disenado para elevar cada paso con
              estilo, presencia y comodidad real.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/catalogo"
                className="inline-flex h-10 items-center rounded-full bg-[var(--primary)] px-4 text-sm font-semibold text-white"
              >
                Explorar catalogo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex h-10 items-center rounded-full border border-[var(--border)] bg-white px-4 text-sm font-semibold"
              >
                Contactar asesor
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">Empresa</p>
            <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <Link href="/nosotros" className="block transition hover:text-[var(--foreground)]">Nosotros</Link>
              <Link href="/contacto" className="block transition hover:text-[var(--foreground)]">Contacto</Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">Ayuda</p>
            <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <Link href="/politicas" className="block transition hover:text-[var(--foreground)]">Politicas</Link>
              <Link href="/terminos" className="block transition hover:text-[var(--foreground)]">Terminos</Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-5 backdrop-blur-sm lg:col-span-3">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">Contacto</p>
            <div className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <a href="mailto:larscalzado@gmail.com" className="inline-flex items-center gap-2 transition hover:text-[var(--foreground)]">
                <Mail className="h-4 w-4" />
                larscalzado@gmail.com
              </a>
              <a href="tel:+573014594421" className="inline-flex items-center gap-2 transition hover:text-[var(--foreground)]">
                <Phone className="h-4 w-4" />
                301 459 4421
              </a>
              <a
                href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-[var(--foreground)]"
              >
                <InstagramIcon className="h-4 w-4" />
                @calzadolarcs
              </a>
              <a
                href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-[var(--foreground)]"
              >
                <MapPin className="h-4 w-4" />
                Ver ubicacion
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)] md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Calzado LARCS. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Hecho para una experiencia premium de compra.</p>
        </div>
      </div>
    </footer>
  );
}
