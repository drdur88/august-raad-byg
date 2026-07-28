import type { Metadata } from "next";
import { Space_Grotesk, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCall from "./components/FloatingCall";
import ExitIntentPopup from "./components/ExitIntentPopup";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = "https://augustraadogbyg.dk";

export const metadata: Metadata = {
  title: "August Råd & Byg – Bygge- og Rådgivning",
  description:
    "Professionel byggerådgivning, renovering, projektledelse og kvalitetssikring. Over 15 års erfaring. Kontakt August Råd & Byg i dag for et gratis og uforpligtende tilbud.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "August Råd & Byg",
  image: `${siteUrl}/logo-real.png`,
  url: siteUrl,
  telephone: "+4512345678",
  email: "info@augustraadogbyg.dk",
  areaServed: "DK",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DK",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:30",
    closes: "17:00",
  },
  priceRange: "$$",
  description:
    "Professionel byggerådgivning, renovering, projektledelse og kvalitetssikring i Danmark. Over 15 års erfaring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="da"
      className={`${spaceGrotesk.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        <FloatingCall />
        <ExitIntentPopup />
        {children}
        <Footer />
      </body>
    </html>
  );
}
