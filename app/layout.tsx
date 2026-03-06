import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { languages, type Locale } from "@/lib/i18n/translations";
import FirstVisitLanguageGate from "@/components/FirstVisitLanguageGate";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("portfolio_locale")?.value;
  const hasLocaleChoice = cookieStore.get("portfolio_lang_chosen")?.value === "1";

  const defaultLocale: Locale = languages.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : "fr";

  return (
    <html lang={defaultLocale}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}  antialiased`}
      >
        <I18nProvider defaultLocale={defaultLocale}>
          <FirstVisitLanguageGate hasLocaleChoice={hasLocaleChoice}>
            {children}
          </FirstVisitLanguageGate>
        </I18nProvider>
      </body>
    </html>
  );
}
