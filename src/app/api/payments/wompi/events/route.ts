import { NextRequest, NextResponse } from "next/server";

import { validateWompiEvent } from "@/services/payments/wompi-events";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Payload de evento invalido." }, { status: 400 });
  }

  const validation = validateWompiEvent(payload, request.headers.get("x-event-checksum"));

  if (!validation.valid) {
    return NextResponse.json({ error: validation.reason }, { status: 401 });
  }

  return NextResponse.json({ received: true });
}