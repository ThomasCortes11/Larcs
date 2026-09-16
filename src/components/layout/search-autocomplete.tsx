"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { BLUR_PLACEHOLDER } from "@/lib/constants";
import { toCurrency } from "@/lib/utils";

type SearchItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();

    const timeout = setTimeout(async () => {
      if (query.trim().length < 2) {
        setItems([]);
        return;
      }

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: ctrl.signal
        });
        const data = (await res.json()) as SearchItem[];
        setItems(data);
        setOpen(true);
      } catch {
        setItems([]);
      }
    }, 180);

    return () => {
      ctrl.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="relative hidden w-72 md:block">
      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3">
        <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Buscar por estilo o color"
          className="h-10 w-full border-none bg-transparent text-sm outline-none"
          aria-label="Buscar productos"
        />
      </div>

      {open && items.length > 0 ? (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-xl">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/producto/${item.slug}`}
              className="flex items-center gap-3 border-b border-[var(--border)] p-3 last:border-b-0 hover:bg-[var(--muted)]"
            >
              <div className="relative h-14 w-12 overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{item.category}</p>
                <p className="text-sm">{toCurrency(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
