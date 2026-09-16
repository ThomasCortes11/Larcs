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
    url: `https://www.larcs.co${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://www.larcs.co/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9
  }));

  return [...staticPages, ...productPages];
}
