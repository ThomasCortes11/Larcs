import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { brandBody, brandDisplay, brandHeading } from "@/lib/fonts";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.larcs.co"),
  alternates: {
    canonical: "/"
  },
  title: {
    default: "LARCS | Calzado Femenino Premium",
    template: "%s | LARCS"
  },
  description:
    "LARCS ofrece calzado femenino premium con botas, botines, mocasines, sandalias y tacones. Compra online con estilo, comodidad y atención personalizada.",
  keywords: [
    "LARCS",
    "calzado femenino",
    "botines premium",
    "botas mujer",
    "mocasines",
    "sandalias",
    "tacones",
    "zapatos premium Colombia",
    "ecommerce calzado"
  ],
  openGraph: {
    title: "LARCS | Calzado Femenino Premium",
    description:
      "Colecciones premium de calzado femenino para cada paso. Estilo, confort y esencia colombiana.",
    type: "website",
    locale: "es_CO",
    url: "https://www.larcs.co",
    siteName: "LARCS"
  },
  twitter: {
    card: "summary_large_image",
    title: "LARCS | Calzado Femenino Premium",
    description:
      "Colecciones premium de calzado femenino para cada paso. Estilo, confort y esencia colombiana."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
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
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
