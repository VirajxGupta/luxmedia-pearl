import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PEARL — Fine Jewellery | Soho, New York",
  description:
    "Sculpted 18k warm gold and single-origin South Sea pearls. Quiet luxury fine jewellery crafted in our Soho Atelier, New York.",
  keywords: [
    "Pearl jewellery",
    "Fine Jewellery New York",
    "Soho Jeweller",
    "18k Gold Ring",
    "South Sea Pearls",
    "Luxury Pearl Ring",
    "High Jewellery NYC",
  ],
  openGraph: {
    title: "PEARL — Fine Jewellery | Soho, New York",
    description:
      "Sculpted 18k warm gold and single-origin South Sea pearls. Quiet luxury fine jewellery crafted in Soho, New York.",
    type: "website",
    locale: "en_US",
    siteName: "PEARL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="bg-pearl-bg text-pearl-espresso font-sans antialiased selection:bg-pearl-gold selection:text-pearl-bg min-h-screen">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
