import { NextRequest, NextResponse } from "next/server";

import { BLUR_PLACEHOLDER } from "@/lib/constants";
import { searchProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchProducts(q);

  return NextResponse.json(
    results.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrls[0] ?? BLUR_PLACEHOLDER,
      category: item.categoryLabel
    }))
  );
}
