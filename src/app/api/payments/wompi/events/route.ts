import { NextRequest, NextResponse } from "next/server";

import { validateWompiEvent } from "@/services/payments/wompi-events";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Payload de evento invalido." }, { status: 400 });
  }

  const validation = validateWompiEvent(payload, request.headers.get("x-event-checksum"));

  if (!validation.valid || !validation.event) {
    return NextResponse.json({ error: validation.reason }, { status: 401 });
  }

  // Sin base de datos, el evento queda en el registro del servidor como respaldo
  // del pedido que el cliente envía por WhatsApp.
  const { event } = validation;
  const transaction = event.data?.transaction;
  if (transaction) {
    console.info(
      `[wompi] ${event.event}: ${transaction.reference} · ${transaction.status} · ` +
        `${Number(transaction.amount_in_cents) / 100} COP · transacción ${transaction.id}`
    );
  }

  return NextResponse.json({ received: true });
}