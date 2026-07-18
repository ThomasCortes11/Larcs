import { CheckoutForm } from "@/components/checkout/checkout-form";

interface PagoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PagoPage({ searchParams }: PagoPageProps) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : undefined;

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Pago</h1>
      {status ? (
        <p className="rounded-xl border border-[var(--border)] bg-white p-4 text-sm">Estado actual del pago: {status}</p>
      ) : null}
      <CheckoutForm />
    </section>
  );
}
