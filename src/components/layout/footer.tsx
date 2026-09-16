import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { InstagramIcon } from "@/components/ui/instagram-icon";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[linear-gradient(180deg,#f6f2f0_0%,#f2efed_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14">
        <div className="grid justify-items-center gap-8 text-center lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr] lg:items-start">
          <div className="flex w-full flex-col items-center">
            <BrandLogo variant="purple" className="h-[120px] w-[180px]" width={180} height={120} />
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Empresa</p>
            <div className="space-y-3 text-base text-[var(--muted-foreground)]">
              <Link href="/nosotros" className="block transition hover:text-[var(--foreground)]">Nosotros</Link>
              <Link href="/contacto" className="block transition hover:text-[var(--foreground)]">Contacto</Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Ayuda</p>
            <div className="space-y-3 text-base text-[var(--muted-foreground)]">
              <Link href="/politicas" className="block transition hover:text-[var(--foreground)]">Politicas</Link>
              <Link href="/terminos" className="block transition hover:text-[var(--foreground)]">Terminos</Link>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-[1.8rem] border border-[var(--border)] bg-white/70 p-5 shadow-[0_18px_40px_-32px_rgba(60,35,35,0.35)] backdrop-blur-sm sm:p-6">
            <p className="mb-5 text-lg font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">Contacto</p>
            <div className="space-y-4 text-sm text-[var(--muted-foreground)] sm:text-base">
              <a href="mailto:larscalzado@gmail.com" className="flex items-center justify-center gap-3 transition hover:text-[var(--foreground)]">
                <Mail className="h-4 w-4 shrink-0" />
                <span>larscalzado@gmail.com</span>
              </a>
              <a href="tel:+573014594421" className="flex items-center justify-center gap-3 transition hover:text-[var(--foreground)]">
                <Phone className="h-4 w-4 shrink-0" />
                <span>301 459 4421</span>
              </a>
              <a href="tel:+573229521433" className="flex items-center justify-center gap-3 transition hover:text-[var(--foreground)]">
                <Phone className="h-4 w-4 shrink-0" />
                <span>322 952 1433</span>
              </a>
              <a
                href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 transition hover:text-[var(--foreground)]"
              >
                <InstagramIcon className="h-4 w-4 shrink-0" />
                <span>@calzadolarcs</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Calzado+LARCS+Bogota+Colombia"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 transition hover:text-[var(--foreground)]"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Ver ubicacion</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-5 text-center text-xs text-[var(--muted-foreground)] sm:text-sm md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Calzado LARCS. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Hecho para una experiencia premium de compra.</p>
        </div>
      </div>
    </footer>
  );
}
