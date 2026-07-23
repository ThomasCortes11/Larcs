"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Heart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toCurrency } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";

export function WishlistDrawer() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button aria-label="Abrir favoritos" className="relative rounded-full border border-[var(--border)] bg-white p-2 hover:bg-[var(--muted)]">
          <Heart className="h-5 w-5" />
          {items.length > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs text-white">
              {items.length}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">Tus favoritos</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Cerrar favoritos" className="rounded-full p-2 hover:bg-[var(--muted)]">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-sm text-[var(--muted-foreground)]">Aun no guardas productos favoritos.</p>
            ) : null}

            {items.map((item) => (
              <article key={item.id} className="flex gap-3 rounded-2xl border border-[var(--border)] p-3">
                <Link href={`/producto/${item.slug}`} className="relative h-20 w-16 overflow-hidden rounded-lg">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-contain bg-[var(--background)] p-1" sizes="64px" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/producto/${item.slug}`} className="line-clamp-2 text-sm font-semibold">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{toCurrency(item.price)}</p>
                  <Link href={`/producto/${item.slug}`} className="mt-2 inline-flex text-xs font-semibold text-[var(--primary)]">
                    Ver producto
                  </Link>
                </div>
                <button className="text-xs text-[var(--primary)]" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="mt-4 border-t border-[var(--border)] pt-4">
            <Link href="/catalogo" className="block">
              <Button className="w-full">Seguir explorando</Button>
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}