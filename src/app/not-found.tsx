import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-5 px-4 text-center">
      <h1 className="text-4xl font-bold">Pagina no encontrada</h1>
      <p className="text-[var(--muted-foreground)]">La ruta que buscas no existe en LARCS.</p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </section>
  );
}
