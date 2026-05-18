import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = "https://august-raad-byg.vercel.app";

export const metadata: Metadata = {
  title: "August Råd & Byg – Bygge- og Rådgivning",
  description:
    "Professionel byggerådgivning, renovering, projektledelse og kvalitetssikring. Over 15 års erfaring. Kontakt August Råd & Byg i dag for et gratis og uforpligtende tilbud.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "August Råd & Byg – Bygge- og Rådgivning",
    description:
      "Professionel byggerådgivning, renovering, projektledelse og kvalitetssikring. Over 15 års erfaring i Danmark.",
    url: siteUrl,
    siteName: "August Råd & Byg",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "August Råd & Byg",
    description: "Professionel byggerådgivning og renovering. Over 15 års erfaring.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
