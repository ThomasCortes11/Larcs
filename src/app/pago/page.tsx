import { CheckoutForm } from "@/components/checkout/checkout-form";

interface PagoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PagoPage(_: PagoPageProps) {

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted-foreground)]">Checkout</p>
        <h1 className="text-3xl font-bold">Pago con Wompi</h1>
        <p className="max-w-2xl text-sm text-[var(--muted-foreground)]">
          Completa tus datos y el sistema te llevará al checkout oficial de Wompi para cerrar la compra sin base de datos.
        </p>
      </div>
      <CheckoutForm />
    </section>
  );
}
