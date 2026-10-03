"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface StockAdminPanelProps {
  products: Product[];
  requiresToken?: boolean;
}

export function StockAdminPanel({ products, requiresToken = false }: StockAdminPanelProps) {
  const [query, setQuery] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [savingById, setSavingById] = useState<Record<string, boolean>>({});
  const [stockById, setStockById] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      products.map((product) => [
        product.id,
        product.variant.stock == null ? "" : String(product.variant.stock)
      ])
    )
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.slug,
        product.reference ?? "",
        product.webReference,
        product.categoryLabel
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [products, query]);

  async function saveStock(product: Product) {
    const rawValue = stockById[product.id]?.trim() ?? "";
    const parsed = rawValue === "" ? null : Number(rawValue);

    if (parsed != null && (!Number.isFinite(parsed) || parsed < 0)) {
      toast.error("El stock debe ser un numero mayor o igual a 0.");
      return;
    }

    setSavingById((current) => ({ ...current, [product.id]: true }));

    try {
      const response = await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "x-admin-token": adminToken } : {})
        },
        body: JSON.stringify({
          productId: product.id,
          stock: parsed == null ? null : Math.trunc(parsed)
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "No se pudo actualizar el stock.");
      }

      const payload = (await response.json()) as {
        product: Product;
      };

      setStockById((current) => ({
        ...current,
        [product.id]:
          payload.product.variant.stock == null
            ? ""
            : String(payload.product.variant.stock)
      }));

      toast.success(`Stock actualizado para ${product.name}.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo actualizar el stock.";
      toast.error(message);
    } finally {
      setSavingById((current) => ({ ...current, [product.id]: false }));
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="admin-stock-search" className="text-sm font-semibold">
          Buscar producto
        </label>
        <input
          id="admin-stock-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nombre, referencia, slug o categoria"
          className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      {requiresToken ? (
        <div className="space-y-2">
          <label htmlFor="admin-stock-token" className="text-sm font-semibold">
            Token de administrador
          </label>
          <input
            id="admin-stock-token"
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Ingresa ADMIN_TOKEN"
            className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
      ) : null}

      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const currentStock = stockById[product.id] ?? "";
          const outOfStock =
            product.variant.stock != null && Number(product.variant.stock) <= 0;

          return (
            <article
              key={product.id}
              className="rounded-2xl border border-[var(--border)] bg-white p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold">{product.name}</h2>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Ref: {product.reference ?? product.webReference} | {product.categoryLabel}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Estado actual: {" "}
                    {product.variant.stock == null
                      ? "Sin control de stock"
                      : outOfStock
                        ? "Agotado"
                        : `${product.variant.stock} unidades`}
                  </p>
                </div>

                <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={currentStock}
                    onChange={(event) =>
                      setStockById((current) => ({
                        ...current,
                        [product.id]: event.target.value
                      }))
                    }
                    placeholder="vacio = sin control"
                    className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm md:w-48"
                  />
                  <Button
                    onClick={() => void saveStock(product)}
                    disabled={savingById[product.id] === true}
                  >
                    {savingById[product.id] ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
