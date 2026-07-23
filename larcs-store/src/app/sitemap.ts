import type { MetadataRoute } from "next";

import { getAllProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/catalogo",
    "/carrito",
    "/pago",
    "/contacto",
    "/nosotros",
    "/politicas",
    "/terminos"
  ].map((route) => ({
    url: `https://larcs.example.com${route}`,
    lastModified: new Date()
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://larcs.example.com/producto/${product.slug}`,
    lastModified: new Date()
  }));

  return [...staticPages, ...productPages];
}
