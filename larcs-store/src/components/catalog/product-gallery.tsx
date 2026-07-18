"use client";

import Image from "next/image";
import { useState } from "react";

import { BLUR_PLACEHOLDER } from "@/lib/constants";

interface ProductGalleryProps {
  name: string;
  imageUrls: string[];
}

export function ProductGallery({ name, imageUrls }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(imageUrls[0]);

  return (
    <div className="grid gap-3">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-white">
        <Image
          src={activeImage}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {imageUrls.slice(0, 8).map((url, idx) => (
          <button
            key={url + idx}
            onClick={() => setActiveImage(url)}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              url === activeImage ? "border-[var(--primary)]" : "border-[var(--border)]"
            } bg-white`}
            aria-label={`Ver imagen ${idx + 1}`}
          >
            <Image src={url} alt={`${name} ${idx + 1}`} fill className="object-cover" sizes="20vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
