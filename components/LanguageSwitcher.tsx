"use client";

import { useTranslation } from "@/lib/i18n";
import { languages, type Locale } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const next = languages[(languages.indexOf(locale) + 1) % languages.length];

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
      aria-label={`Switch to ${LOCALE_LABELS[next]}`}
      title={`Switch to ${LOCALE_LABELS[next]}`}
    >
      <Globe size={15} />
      <span>{LOCALE_LABELS[locale]}</span>
    </button>
  );
}
