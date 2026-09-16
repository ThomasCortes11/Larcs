import Link from "next/link";

import { ClearCartOnApproval } from "@/components/checkout/clear-cart-on-approval";
import { Button } from "@/components/ui/button";
import { toCurrency } from "@/lib/utils";
import { fetchWompiTransaction } from "@/services/payments/wompi";

interface PagoResultadoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingleParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

function statusLabel(status?: string) {
  switch (status) {
    case "APPROVED":
      return "Aprobado";
    case "PENDING":
      return "Pendiente";
    case "DECLINED":
      return "Rechazado";
    case "VOIDED":
      return "Anulado";
    default:
      return status ? status : "Sin confirmar";
  }
}

export default async function PagoResultadoPage({ searchParams }: PagoResultadoPageProps) {
  const params = await searchParams;
  const transactionId = getSingleParam(params.id);
  const reference = getSingleParam(params.reference);

  const transaction = transactionId ? await fetchWompiTransaction(transactionId).catch(() => null) : null;
  const status = transaction?.status ?? getSingleParam(params.status);
  const amountInCents = transaction?.amount_in_cents;
  const approved = status === "APPROVED";

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-4 py-10 md:px-6">
      <ClearCartOnApproval shouldClear={approved} />
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted-foreground)]">Wompi</p>
        <h1 className="text-3xl font-bold">Resultado del pago</h1>
        <p className="max-w-2xl text-sm text-[var(--muted-foreground)]">
          Wompi regresa aquí con el identificador de la transacción. Si la API responde, verás el estado real del cobro.
        </p>
      </div>

      <div className="grid gap-4 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(31,31,31,0.25)] md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm text-[var(--muted-foreground)]">Estado</p>
          <p className="text-2xl font-semibold">{statusLabel(status)}</p>
          <p className="text-sm text-[var(--muted-foreground)]">
            {transactionId ? `Transacción ${transactionId}` : "No llegó el id de la transacción."}
          </p>
        </div>

        <div className="space-y-3 rounded-2xl bg-[var(--muted)] p-5">
          <p className="text-sm text-[var(--muted-foreground)]">Detalle</p>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between gap-3">
              <span>Referencia</span>
              <span className="font-medium">{reference ?? "No disponible"}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span>Moneda</span>
              <span className="font-medium">{transaction?.currency ?? "COP"}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span>Valor</span>
              <span className="font-medium">{amountInCents ? toCurrency(amountInCents / 100) : "Pendiente"}</span>
            </p>
            <p className="flex justify-between gap-3">
              <span>Método</span>
              <span className="font-medium">{transaction?.payment_method_type ?? "No informado"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/catalogo">
          <Button>Volver al catálogo</Button>
        </Link>
        <Link href="/carrito">
          <Button variant="secondary">Ver carrito</Button>
        </Link>
      </div>
    </section>
  );
}