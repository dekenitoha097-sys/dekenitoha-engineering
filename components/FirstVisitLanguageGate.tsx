"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/translations";
import "./FirstVisitLanguageGate.css";

interface FirstVisitLanguageGateProps {
  children: React.ReactNode;
  hasLocaleChoice: boolean;
}

type GatePhase = "select" | "loading" | "done";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export default function FirstVisitLanguageGate({
  children,
  hasLocaleChoice,
}: FirstVisitLanguageGateProps) {
  const { setLocale } = useTranslation();
  const [phase, setPhase] = useState<GatePhase>(hasLocaleChoice ? "done" : "select");
  const [selectedLocale, setSelectedLocale] = useState<Locale>("fr");

  const handleLanguageChoice = (locale: Locale) => {
    setSelectedLocale(locale);
    setLocale(locale);

    document.cookie = `portfolio_locale=${locale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
    document.cookie = `portfolio_lang_chosen=1; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;

    setPhase("loading");
    window.setTimeout(() => {
      setPhase("done");
    }, 3000);
  };

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <div className="language-gate" role="dialog" aria-modal="true" aria-label="Language selection">
      <div className="language-gate-card">
        {phase === "select" ? (
          <>
            <p className="language-gate-eyebrow">Welcome / Bienvenue</p>
            <h1 className="language-gate-title">Choose your language</h1>
            <p className="language-gate-subtitle">Choisissez votre langue pour continuer.</p>

            <div className="language-gate-actions">
              <button
                type="button"
                className="language-gate-btn"
                onClick={() => handleLanguageChoice("fr")}
              >
                Continuer en Francais
              </button>
              <button
                type="button"
                className="language-gate-btn language-gate-btn--secondary"
                onClick={() => handleLanguageChoice("en")}
              >
                Continue in English
              </button>
            </div>
          </>
        ) : (
          <div className="language-gate-loading">
            <span className="language-gate-spinner" aria-hidden="true" />
            <p className="language-gate-loading-text">
              {selectedLocale === "fr" ? "Chargement de votre experience..." : "Loading your experience..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
