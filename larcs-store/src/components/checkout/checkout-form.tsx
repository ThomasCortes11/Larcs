"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const checkoutSchema = z.object({
  customerName: z.string().min(3, "Nombre requerido"),
  email: z.string().email("Email invalido"),
  phone: z.string().min(7, "Telefono invalido"),
  address: z.string().min(8, "Direccion requerida"),
  city: z.string().min(2, "Ciudad requerida"),
  department: z.string().min(2, "Departamento requerido")
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = form.handleSubmit(() => {
    router.push("/pago?status=pending&provider=stripe");
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-[var(--border)] bg-white p-6">
      <h2 className="text-xl font-semibold">Checkout seguro</h2>
      <Input placeholder="Nombre completo" {...form.register("customerName")} />
      <Input placeholder="Email" type="email" {...form.register("email")} />
      <Input placeholder="Telefono" {...form.register("phone")} />
      <Input placeholder="Direccion" {...form.register("address")} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Ciudad" {...form.register("city")} />
        <Input placeholder="Departamento" {...form.register("department")} />
      </div>
      <Button type="submit">Pagar seguro</Button>
    </form>
  );
}
