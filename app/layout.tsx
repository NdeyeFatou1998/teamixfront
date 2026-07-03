import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.teamix.pro"),
  title: {
    default: "Teamix — Plateforme entreprise",
    template: "%s | Teamix",
  },
  description:
    "Teamix centralise reporting, projets, congés et coffre-fort pour les entreprises. Plateforme B2B multi-tenant sécurisée.",
  keywords: ["Teamix", "gestion entreprise", "SaaS B2B", "RH", "projets", "reporting"],
  authors: [{ name: "Teamix" }],
  openGraph: {
    title: "Teamix — Plateforme entreprise",
    description:
      "Pilotez votre entreprise en un seul endroit. Reporting, projets, congés et coffre-fort sécurisé.",
    url: "https://www.teamix.pro",
    siteName: "Teamix",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Teamix — Plateforme entreprise",
    description: "Pilotez votre entreprise en un seul endroit.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
