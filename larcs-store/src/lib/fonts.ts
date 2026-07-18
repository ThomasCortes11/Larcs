import { Cinzel_Decorative, Cormorant_Garamond, Nunito_Sans } from "next/font/google";

export const brandBody = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-brand-body",
  display: "swap"
});

export const brandHeading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-brand-heading",
  display: "swap"
});

export const brandDisplay = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-brand-display",
  display: "swap"
});
