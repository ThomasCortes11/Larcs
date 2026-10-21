import Link from "next/link";
import { BadgeCheck, ChevronRight, CreditCard, RotateCcw, ShieldCheck, Truck } from "lucide-react";

// Lo que protege a la clienta al comprar, con enlace a cada política.
export const GUARANTEES = [
  {
    href: "/politicas#garantia",
    icon: BadgeCheck,
    title: "Garantía de fábrica",
    detail: "Calzado nuevo con garantía por defectos de fabricación."
  },
  {
    href: "/politicas#plazos-de-entrega",
    icon: Truck,
    title: "Envíos a toda Colombia",
    detail: "Te informamos el plazo de entrega antes de pagar."
  },
  {
    href: "/politicas#derecho-de-retracto",
    icon: RotateCcw,
    title: "Retracto en 5 días",
    detail: "Si te arrepientes, tienes 5 días hábiles desde la entrega."
  },
  {
    href: "/terminos#precios-y-pagos",
    icon: CreditCard,
    title: "Pago seguro",
    detail: "Paga con Wompi, ADDI, contra entrega o en tienda."
  }
] as const;

interface PurchaseGuaranteesProps {
  // "inline": una línea sutil (carrito). "card": recuadro con las políticas (página de producto).
  variant: "inline" | "card";
  onNavigate?: () => void;
}

export function PurchaseGuarantees({ variant, onNavigate }: PurchaseGuaranteesProps) {
  if (variant === "inline") {
    return (
      <Link
        href="/politicas"
        onClick={onNavigate}
        className="group flex items-center justify-center gap-1.5 text-xs text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden />
        <span>
          Compra protegida: <span className="underline underline-offset-2">garantía, envíos y retracto</span>
        </span>
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--primary)_22%,white)] bg-[color-mix(in_srgb,var(--muted)_35%,white)] p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <ShieldCheck className="h-4 w-4 text-[var(--primary)]" aria-hidden />
        Compra con confianza
      </p>
      <ul className="grid gap-1 sm:grid-cols-2">
        {GUARANTEES.map(({ href, icon: Icon, title, detail }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-[0_6px_14px_-10px_var(--primary)]">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{title}</span>
                <span className="block text-xs text-[var(--muted-foreground)]">{detail}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
