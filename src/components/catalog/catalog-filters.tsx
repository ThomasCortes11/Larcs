"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { CATEGORY_LABELS } from "@/lib/constants";

interface CatalogFiltersProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedSort?: string;
  minPrice?: string;
  maxPrice?: string;
  onlyPromo?: boolean;
  onlyNew?: boolean;
  colors: string[];
  sizes: string[];
}

export function CatalogFilters({
  searchQuery,
  selectedCategory,
  selectedColor,
  selectedSize,
  selectedSort,
  minPrice,
  maxPrice,
  onlyPromo,
  onlyNew,
  colors,
  sizes
}: CatalogFiltersProps) {
  // En celular los filtros arrancan plegados para mostrar primero los productos; el número indica cuántos hay aplicados.
  const activeFilters = [
    selectedCategory,
    selectedColor,
    selectedSize,
    minPrice,
    maxPrice,
    onlyPromo,
    onlyNew
  ].filter(Boolean).length;
  const [open, setOpen] = useState(false);

  const fieldClass =
    "h-11 w-full rounded-xl border border-[var(--border)] bg-white/90 px-3 text-sm shadow-inner outline-none transition focus:border-[var(--primary)]";

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="catalog-filters"
        className="flex min-h-[48px] w-full items-center justify-between rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold transition active:scale-[0.98] lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-[var(--primary)]"
            aria-hidden
          />
          Filtrar y ordenar
        </span>
        {activeFilters ? (
          <span className="rounded-full bg-[var(--primary)] px-2.5 py-0.5 text-xs text-white">
            {activeFilters}
          </span>
        ) : (
          <span className="text-xs font-normal text-[var(--muted-foreground)]">
            {open ? "Ocultar" : "Mostrar"}
          </span>
        )}
      </button>
      <form
        id="catalog-filters"
        className={`${open ? "grid" : "hidden"} gap-4 rounded-3xl border border-[var(--border)] bg-[linear-gradient(150deg,white,color-mix(in_srgb,var(--muted)_30%,white))] p-5 shadow-[0_16px_38px_-34px_var(--ink-black)] lg:grid lg:grid-cols-4`}
      >
        {searchQuery ? (
          <input type="hidden" name="q" value={searchQuery} />
        ) : null}
        <div>
          <label
            htmlFor="categoria"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            defaultValue={selectedCategory ?? ""}
            className={fieldClass}
          >
            <option value="">Todas</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="color"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Color
          </label>
          <select
            id="color"
            name="color"
            defaultValue={selectedColor ?? ""}
            className={fieldClass}
          >
            <option value="">Todos</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="size"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Talla
          </label>
          <select
            id="size"
            name="size"
            defaultValue={selectedSize ?? ""}
            className={fieldClass}
          >
            <option value="">Todas</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Orden
          </label>
          <select
            id="sort"
            name="sort"
            defaultValue={selectedSort ?? "popular"}
            className={fieldClass}
          >
            <option value="popular">Popularidad</option>
            <option value="newest">Nuevos</option>
            <option value="price-asc">Precio menor a mayor</option>
            <option value="price-desc">Precio mayor a menor</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="minPrice"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Precio mínimo
          </label>
          <input
            id="minPrice"
            name="minPrice"
            defaultValue={minPrice ?? ""}
            type="number"
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="maxPrice"
            className="mb-1 block text-xs tracking-wide text-[var(--muted-foreground)] uppercase"
          >
            Precio máximo
          </label>
          <input
            id="maxPrice"
            name="maxPrice"
            defaultValue={maxPrice ?? ""}
            type="number"
            className={fieldClass}
          />
        </div>

        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-transparent bg-white/70 px-3 text-sm">
          <input
            type="checkbox"
            name="promo"
            defaultChecked={onlyPromo}
            className="h-4 w-4"
          />
          Solo promoción
        </label>

        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-transparent bg-white/70 px-3 text-sm">
          <input
            type="checkbox"
            name="nuevo"
            defaultChecked={onlyNew}
            className="h-4 w-4"
          />
          Solo nuevos
        </label>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="h-11 rounded-full bg-[color-mix(in_srgb,var(--primary)_82%,black)] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Aplicar
          </button>
          <a
            href="/catalogo"
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold transition hover:bg-[var(--muted)]"
          >
            Limpiar
          </a>
        </div>
      </form>
    </div>
  );
}
