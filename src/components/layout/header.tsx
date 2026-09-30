"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Heart, MapPin, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { SearchAutocomplete } from "@/components/layout/search-autocomplete";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { useCartStore } from "@/store/cart-store";

const CartDrawer = dynamic(
  () => import("@/components/layout/cart-drawer").then((module) => module.CartDrawer),
  { ssr: false }
);
const WishlistDrawer = dynamic(
  () => import("@/components/layout/wishlist-drawer").then((module) => module.WishlistDrawer),
  { ssr: false }
);

const categories = ["botas", "botines", "tacones", "sandalias", "flats"];

export function Header() {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const cartItemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0)
  );
  const collectionsRef = useRef<HTMLDivElement>(null);
  const collectionsCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCollections = () => {
    if (collectionsCloseTimeout.current) {
      clearTimeout(collectionsCloseTimeout.current);
    }

    setCollectionsOpen(true);
  };

  const closeCollectionsSoon = () => {
    collectionsCloseTimeout.current = setTimeout(() => setCollectionsOpen(false), 180);
  };

  useEffect(() => {
    if (!collectionsOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (collectionsRef.current && !collectionsRef.current.contains(event.target as Node)) {
        setCollectionsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCollectionsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [collectionsOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_80%,white)]/95 shadow-[0_10px_30px_-28px_var(--ink-black)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 md:gap-4 md:px-6 md:py-3">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white p-0 shadow-sm transition hover:bg-[var(--muted)] md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] md:hidden" />
            <Dialog.Content className="fixed left-3 top-3 z-50 flex h-[calc(100vh-1.5rem)] w-[86vw] max-w-sm flex-col rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,#fffdfd_0%,#f9f1f4_100%)] p-5 shadow-[0_30px_80px_-30px_rgba(17,17,17,0.55)] md:hidden">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-semibold text-[var(--foreground)]">Colecciones</Dialog.Title>
                <Dialog.Close asChild>
                  <button aria-label="Cerrar menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white p-0 transition hover:bg-[var(--muted)]">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="mt-6 grid gap-2.5">
                {categories.map((item) => (
                  <Dialog.Close asChild key={`mobile-${item}`}>
                    <Link
                      href={`/catalogo?categoria=${item}`}
                      className="rounded-2xl border border-[var(--border)] bg-white/85 px-4 py-3 text-base font-semibold capitalize text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)]"
                    >
                      {item}
                    </Link>
                  </Dialog.Close>
                ))}
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
                  Buscar productos
                </p>
                <SearchAutocomplete className="w-full" />
              </div>

              <div className="mt-6 grid gap-2.5 border-t border-[var(--border)] pt-5">
                <a
                  href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calzado+LARCS+Bogota+Colombia"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
                >
                  Ver ubicacion
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <BrandLogo className="h-[44px] min-h-[44px] w-16 sm:h-[42px] sm:min-h-[42px] sm:w-[96px]" />
        <nav className="hidden flex-1 items-center gap-2 md:flex">
          <div
            ref={collectionsRef}
            className="relative"
            onMouseEnter={openCollections}
            onMouseLeave={closeCollectionsSoon}
          >
            <button
              type="button"
              aria-expanded={collectionsOpen}
              onClick={() => {
                if (collectionsOpen) {
                  setCollectionsOpen(false);
                } else {
                  openCollections();
                }
              }}
              className="min-h-11 rounded-full px-4 py-2 text-sm uppercase tracking-wide text-[var(--foreground)] transition hover:bg-white hover:text-[var(--primary)]"
            >
              Colecciones
            </button>
            {collectionsOpen ? <div className="absolute left-0 top-11 z-50 w-[600px] rounded-3xl border border-[var(--border)] bg-white p-5 shadow-xl transition-opacity duration-200">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((item) => (
                  <Link
                    key={`mega-${item}`}
                    href={`/catalogo?categoria=${item}`}
                    onClick={() => setCollectionsOpen(false)}
                    className="rounded-2xl border border-[var(--border)] p-3 text-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)]"
                  >
                    <p className="font-semibold capitalize">{item}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Nueva temporada premium</p>
                  </Link>
                ))}
              </div>
            </div> : null}
          </div>
        </nav>
        <SearchAutocomplete />
        <a
          href="https://www.instagram.com/calzadolarcs?igsh=MXBrc3VxamxmOGxjZA=="
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram LARCS"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white p-0 hover:bg-[var(--muted)] sm:inline-flex"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Calzado+LARCS+Bogota+Colombia"
          target="_blank"
          rel="noreferrer"
          aria-label="Ver ubicacion en Google Maps"
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white p-0 hover:bg-[var(--muted)] md:inline-flex"
        >
          <MapPin className="h-5 w-5" />
        </a>
        <button
          type="button"
          aria-label="Abrir favoritos"
          className="relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white p-0 hover:bg-[var(--muted)]"
          onClick={() => setWishlistOpen(true)}
        >
          <Heart className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Abrir carrito"
          className="relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full p-0 hover:bg-[var(--muted)]"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag className="h-5 w-5" />
          {cartItemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs text-white">
              {cartItemCount}
            </span>
          ) : null}
        </button>
        {wishlistOpen ? <WishlistDrawer open={wishlistOpen} onOpenChange={setWishlistOpen} /> : null}
        {cartOpen ? <CartDrawer open={cartOpen} onOpenChange={setCartOpen} /> : null}
        <Link href="/pago" className="ml-auto shrink-0">
          <Button size="md" className="brand-display px-3 text-sm sm:px-5">
            Comprar
          </Button>
        </Link>
      </div>
    </header>
  );
}
