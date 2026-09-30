"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ProductZoomDialogProps {
  name: string;
  imageUrl: string;
  onClose: () => void;
}

export function ProductZoomDialog({ name, imageUrl, onClose }: ProductZoomDialogProps) {
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-white p-4 shadow-2xl md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-[var(--foreground)]">{name}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Cerrar imagen" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--muted)]">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_42%,white),white)] p-4 md:p-8">
            <Image src={imageUrl} alt={name} fill className="object-contain p-4" sizes="90vw" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
