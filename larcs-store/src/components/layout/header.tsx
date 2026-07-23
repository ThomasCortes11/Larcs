"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { MapPin, Menu, X } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchAutocomplete } from "@/components/layout/search-autocomplete";
import { WishlistDrawer } from "@/components/layout/wishlist-drawer";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/instagram-icon";

const categories = ["botas", "botines", "tacones", "sandalias", "mocasines"];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_80%,white)]/95 shadow-[0_10px_30px_-28px_var(--ink-black)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)] md:hidden" aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 md:hidden" />
            <Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[88vw] max-w-sm bg-white p-5 shadow-2xl md:hidden">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-semibold">Colecciones</Dialog.Title>
                <Dialog.Close asChild>
                  <button aria-label="Cerrar menu" className="rounded-full border border-[var(--border)] p-2 hover:bg-[var(--muted)]">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="mt-6 grid gap-3">
                {categories.map((item) => (
                  <Dialog.Close asChild key={`mobile-${item}`}>
                    <Link
                      href={`/catalogo?categoria=${item}`}
                      className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold capitalize text-[var(--foreground)]"
                    >
                      {item}
                    </Link>
                  </Dialog.Close>
                ))}
              </div>

              <div className="mt-6 grid gap-3 border-t border-[var(--border)] pt-6">
                <a
                  href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold"
                >
                  Instagram
                </a>
                <a
                  href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold"
                >
                  Ver ubicacion
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <BrandLogo priority className="shrink-0" />
        <nav className="hidden flex-1 items-center gap-2 md:flex">
          <div className="group relative">
            <button className="rounded-full px-4 py-2 text-sm uppercase tracking-wide text-[var(--foreground)] transition hover:bg-white hover:text-[var(--primary)]">
              Colecciones
            </button>
            <div className="invisible absolute left-0 top-12 z-50 w-[600px] translate-y-2 rounded-3xl border border-[var(--border)] bg-white p-5 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((item) => (
                  <Link
                    key={`mega-${item}`}
                    href={`/catalogo?categoria=${item}`}
                    className="rounded-2xl border border-[var(--border)] p-3 text-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)]"
                  >
                    <p className="font-semibold capitalize">{item}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Nueva temporada premium</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <SearchAutocomplete />
        <a
          href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram LARCS"
          className="rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)]"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
        <a
          href="https://maps.app.goo.gl/NtL9N8v9Gmy418Ay7?g_st=iw"
          target="_blank"
          rel="noreferrer"
          aria-label="Ver ubicacion en Google Maps"
          className="rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)]"
        >
          <MapPin className="h-5 w-5" />
        </a>
        <WishlistDrawer />
        <CartDrawer />
        <Link href="/pago">
          <Button size="md" className="brand-display">
            Comprar
          </Button>
        </Link>
      </div>
    </header>
  );
}
