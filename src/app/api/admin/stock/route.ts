import { NextResponse } from "next/server";

import { updateProductStock } from "@/lib/products";

interface StockPatchBody {
  productId?: string;
  stock?: number | null;
}

export async function PATCH(request: Request) {
  const configuredAdminToken = process.env.ADMIN_TOKEN;
  if (configuredAdminToken) {
    const providedToken = request.headers.get("x-admin-token");
    if (!providedToken || providedToken !== configuredAdminToken) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }
  }

  let body: StockPatchBody;

  try {
    body = (await request.json()) as StockPatchBody;
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  if (!body.productId || typeof body.productId !== "string") {
    return NextResponse.json(
      { error: "productId es obligatorio." },
      { status: 400 }
    );
  }

  const stockValue = body.stock;
  const isStockValid =
    stockValue == null ||
    (typeof stockValue === "number" && Number.isFinite(stockValue) && stockValue >= 0);

  if (!isStockValid) {
    return NextResponse.json(
      { error: "stock debe ser null o un numero mayor o igual a 0." },
      { status: 400 }
    );
  }

  const product = await updateProductStock(
    body.productId,
    stockValue == null ? null : Math.trunc(stockValue)
  );

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, product });
}
