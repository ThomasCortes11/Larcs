"use client";

import Link from "next/link";
import { Heart, Menu } from "lucide-react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchAutocomplete } from "@/components/layout/search-autocomplete";
import { Button } from "@/components/ui/button";

const categories = ["botas", "botines", "tacones", "sandalias", "mocasines"];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_80%,white)]/95 shadow-[0_10px_30px_-28px_var(--ink-black)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <button className="rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)] md:hidden" aria-label="Abrir menu">
          <Menu className="h-5 w-5" />
        </button>
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
          {categories.map((item) => (
            <Link
              key={item}
              href={`/catalogo?categoria=${item}`}
              className="rounded-full px-4 py-2 text-sm uppercase tracking-wide text-[var(--foreground)] transition hover:bg-white hover:text-[var(--primary)]"
            >
              {item}
            </Link>
          ))}
        </nav>
        <SearchAutocomplete />
        <Link href="/" aria-label="Wishlist" className="rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)]">
          <Heart className="h-5 w-5" />
        </Link>
        <CartDrawer />
        <Link href="/catalogo">
          <Button size="md" className="brand-display">
            Comprar
          </Button>
        </Link>
      </div>
    </header>
  );
}
