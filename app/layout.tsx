import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | DEKENI Toha - Etudiant Informatique & IA",
  description:
    "Portfolio professionnel de DEKENI Toha, etudiant en 2eme annee Informatique et Intelligence Artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}  antialiased`}
      >
        <I18nProvider defaultLocale="fr">{children}</I18nProvider>
      </body>
    </html>
  );
}
