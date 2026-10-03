"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { BLUR_PLACEHOLDER } from "@/lib/constants";
import { cn, toCurrency } from "@/lib/utils";

type SearchItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

interface SearchAutocompleteProps {
  className?: string;
}

export function SearchAutocomplete({ className }: SearchAutocompleteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();

    const timeout = setTimeout(async () => {
      if (query.trim().length < 2) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: ctrl.signal
        });
        if (!res.ok) {
          setItems([]);
          return;
        }
        const data = (await res.json()) as SearchItem[];
        setItems(data);
        setOpen(true);
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => {
      ctrl.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className={cn("relative", className ?? "hidden w-72 md:block")}>
      <form
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3"
        onSubmit={(event) => {
          event.preventDefault();
          const normalizedQuery = query.trim();
          if (!normalizedQuery) return;
          setOpen(false);
          router.push(`/catalogo?q=${encodeURIComponent(normalizedQuery)}`);
        }}
      >
        <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Buscar por estilo o color"
          className="h-11 w-full border-none bg-transparent text-sm outline-none"
          aria-label="Buscar productos"
        />
      </form>

      {open && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-xl">
          {isLoading ? (
            <p className="p-3 text-sm text-[var(--muted-foreground)]">Buscando...</p>
          ) : items.length === 0 ? (
            <p className="p-3 text-sm text-[var(--muted-foreground)]">
              Sin resultados. Presiona Enter para buscar en catalogo.
            </p>
          ) : (
            items.map((item) => (
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
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
