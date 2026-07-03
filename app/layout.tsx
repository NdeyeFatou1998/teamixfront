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
    default: "Teamix",
    template: "%s · Teamix",
  },
  description:
    "Teamix centralise reporting, projets, congés et coffre-fort pour les entreprises. Hub B2B multi-tenant sécurisé.",
  applicationName: "Teamix",
  keywords: ["Teamix", "gestion entreprise", "SaaS B2B", "RH", "projets", "reporting"],
  authors: [{ name: "Teamix" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Teamix",
    description:
      "Pilotez votre entreprise depuis un seul hub. Reporting, projets, congés et coffre-fort sécurisé.",
    url: "https://www.teamix.pro",
    siteName: "Teamix",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Teamix",
    description: "Le hub de gestion pour votre entreprise.",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
