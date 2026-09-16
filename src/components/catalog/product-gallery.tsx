"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";

import { BLUR_PLACEHOLDER } from "@/lib/constants";

interface ProductGalleryProps {
  name: string;
  imageUrls: string[];
}

export function ProductGallery({ name, imageUrls }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(imageUrls[0]);

  return (
    <div className="grid gap-3">
      <Dialog.Root>
        <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_35%,white),white)] p-4">
          <Image
            src={activeImage}
            alt={name}
            fill
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:border-[var(--primary)]"
            >
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </button>
          </Dialog.Trigger>
        </div>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-white p-4 shadow-2xl md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold text-[var(--foreground)]">{name}</Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" aria-label="Cerrar imagen" className="rounded-full border border-[var(--border)] p-2 hover:bg-[var(--muted)]">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_42%,white),white)] p-4 md:p-8">
              <Image
                src={activeImage}
                alt={name}
                fill
                className="object-contain p-4"
                sizes="90vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="grid grid-cols-4 gap-2">
        {imageUrls.slice(0, 8).map((url, idx) => (
          <button
            key={url + idx}
            onClick={() => setActiveImage(url)}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              url === activeImage ? "border-[var(--primary)]" : "border-[var(--border)]"
            } bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_35%,white),white)]`}
            aria-label={`Ver imagen ${idx + 1}`}
          >
            <Image src={url} alt={`${name} ${idx + 1}`} fill className="object-contain p-1.5" sizes="20vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
