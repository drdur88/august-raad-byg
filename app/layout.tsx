import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "August Råd & Byg – Bygge- og Rådgivning",
  description:
    "Professionel byggerådgivning, projektledelse, tilsyn og renoveringsrådgivning. Kontakt August Råd & Byg i dag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
