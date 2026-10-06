import type { Metadata } from "next";

import { StockAdminPanel } from "@/components/admin/stock-admin-panel";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Stock"
};

export default async function AdminPage() {
  const products = await getAllProducts();
  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name, "es"));
  const requiresToken = Boolean(process.env.ADMIN_TOKEN);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Panel de stock</h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Define stock por producto. Si el valor es 0, el producto aparece agotado y se bloquea la compra.
        Si lo dejas vacio, queda como &quot;sin control de stock&quot;.
      </p>
      {requiresToken ? (
        <p className="text-sm text-[var(--muted-foreground)]">
          Este panel requiere token de administrador para guardar cambios.
        </p>
      ) : null}
      <StockAdminPanel products={sortedProducts} requiresToken={requiresToken} />
    </section>
  );
}
