import { CATEGORY_LABELS } from "@/lib/constants";

interface CatalogFiltersProps {
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
  const fieldClass =
    "h-11 w-full rounded-xl border border-[var(--border)] bg-white/90 px-3 text-sm shadow-inner outline-none transition focus:border-[var(--primary)]";

  return (
    <form className="grid gap-4 rounded-3xl border border-[var(--border)] bg-[linear-gradient(150deg,white,color-mix(in_srgb,var(--muted)_30%,white))] p-5 shadow-[0_16px_38px_-34px_var(--ink-black)] lg:grid-cols-4">
      <div>
        <label htmlFor="categoria" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
          Categoria
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
        <label htmlFor="color" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
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
        <label htmlFor="size" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
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
        <label htmlFor="sort" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
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
        <label htmlFor="minPrice" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
          Precio min
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
        <label htmlFor="maxPrice" className="mb-1 block text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
          Precio max
        </label>
        <input
          id="maxPrice"
          name="maxPrice"
          defaultValue={maxPrice ?? ""}
          type="number"
          className={fieldClass}
        />
      </div>

      <label className="flex items-center gap-2 rounded-xl border border-transparent bg-white/70 px-3 text-sm">
        <input type="checkbox" name="promo" defaultChecked={onlyPromo} className="h-4 w-4" />
        Solo promocion
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-transparent bg-white/70 px-3 text-sm">
        <input type="checkbox" name="nuevo" defaultChecked={onlyNew} className="h-4 w-4" />
        Solo nuevos
      </label>

      <div className="flex items-end gap-2">
        <button type="submit" className="h-11 rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90">
          Aplicar
        </button>
        <a href="/catalogo" className="h-11 rounded-full border border-[var(--border)] bg-white px-5 text-sm font-semibold leading-[44px] transition hover:bg-[var(--muted)]">
          Limpiar
        </a>
      </div>
    </form>
  );
}
