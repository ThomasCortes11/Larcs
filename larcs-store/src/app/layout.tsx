import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { brandBody, brandDisplay, brandHeading } from "@/lib/fonts";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://larcs.example.com"),
  title: {
    default: "LARCS | Calzado Femenino Premium",
    template: "%s | LARCS"
  },
  description:
    "Ecommerce premium de calzado femenino con colecciones de botas, botines, mocasines, sandalias y tacones.",
  openGraph: {
    title: "LARCS",
    description: "Calzado femenino premium",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LARCS",
    description: "Calzado femenino premium"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${brandBody.variable} ${brandHeading.variable} ${brandDisplay.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
