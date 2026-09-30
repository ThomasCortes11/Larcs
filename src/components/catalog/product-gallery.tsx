"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Expand } from "lucide-react";

import { BLUR_PLACEHOLDER } from "@/lib/constants";

const ProductZoomDialog = dynamic(
  () =>
    import("@/components/catalog/product-zoom-dialog").then(
      (module) => module.ProductZoomDialog
    ),
  { ssr: false }
);

interface ProductGalleryProps {
  name: string;
  imageUrls: string[];
}

export function ProductGallery({ name, imageUrls }: ProductGalleryProps) {
  const hasImages = imageUrls.length > 0;
  const [activeImage, setActiveImage] = useState(imageUrls[0] ?? BLUR_PLACEHOLDER);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  function handleTouchEnd(touchEndX: number) {
    if (touchStartX.current === null || imageUrls.length < 2) return;

    const delta = touchStartX.current - touchEndX;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;

    const activeIndex = Math.max(0, imageUrls.indexOf(activeImage));
    const direction = delta > 0 ? 1 : -1;
    const nextIndex = (activeIndex + direction + imageUrls.length) % imageUrls.length;
    setActiveImage(imageUrls[nextIndex]);
  }

  return (
    <div className="grid gap-3">
      <div
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_35%,white),white)] p-4"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const touchEndX = event.changedTouches[0]?.clientX;
            if (touchEndX !== undefined) handleTouchEnd(touchEndX);
          }}
        >
          <Image
            src={activeImage}
            alt={hasImages ? name : `Imagen no disponible para ${name}`}
            fill
            priority={hasImages}
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 600px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute right-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-white/90 px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:border-[var(--primary)]"
          >
            <Expand className="h-3.5 w-3.5" />
            Ampliar
          </button>
      </div>
      {isZoomOpen ? (
        <ProductZoomDialog
          name={name}
          imageUrl={activeImage}
          onClose={() => setIsZoomOpen(false)}
        />
      ) : null}
      {hasImages ? <div className="grid grid-cols-4 gap-2">
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
      </div> : null}
    </div>
  );
}
