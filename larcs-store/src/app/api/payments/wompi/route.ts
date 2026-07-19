import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { buildWompiCheckoutUrl, createWompiReference, resolveCheckoutSummary } from "@/services/payments/wompi";

const itemSchema = z.object({
  id: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().positive()
});

const checkoutSchema = z.object({
  customerName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(8),
  city: z.string().min(2),
  department: z.string().min(2),
  items: z.array(itemSchema).min(1)
});

export async function POST(request: NextRequest) {
  try {
    const body = checkoutSchema.parse(await request.json());
    const summary = await resolveCheckoutSummary(body.items);
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

    if (!publicKey || !integritySecret) {
      return NextResponse.json(
        { error: "Falta configurar las llaves de Wompi en el entorno." },
        { status: 500 }
      );
    }

    const reference = createWompiReference();
    const { checkoutUrl, amountInCents, redirectUrl } = buildWompiCheckoutUrl({
      origin: request.nextUrl.origin,
      publicKey,
      integritySecret,
      customer: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        department: body.department
      },
      reference,
      total: summary.total
    });

    return NextResponse.json({
      checkoutUrl,
      reference,
      amountInCents,
      redirectUrl: redirectUrl ?? null,
      summary
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo iniciar el checkout de Wompi.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}