"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import CVDocument from "@/components/CVDocument";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { trackCvDownload, trackCvPrint } from "@/lib/analytics";
import type { CvCategory } from "@/app/cv/cv-data";
import { Download, Printer, Lock, Eye, EyeOff } from "lucide-react";
import "@/app/cv/cv-page.css";
import "@/app/special/special-page.css";

const CORRECT_PASSWORD = "To70ha22@";

export default function SpecialCvPage() {
  const { t, locale } = useTranslation();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [activeCvCategory, setActiveCvCategory] = useState<CvCategory>("general");
  const cvRef = useRef<HTMLDivElement>(null);

  const cvCategories: CvCategory[] = ["general", "web", "ai", "games", "nodejs"];
  const cvCategoryLabels: Record<CvCategory, TranslationKey> = {
    general: "cv.category.general",
    web: "cv.category.web",
    ai: "cv.category.ai",
    games: "cv.category.games",
    nodejs: "cv.category.nodejs",
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleDownloadCV = async () => {
    if (!cvRef.current) return;

    trackCvDownload();

    const printRules: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule instanceof CSSMediaRule && rule.conditionText === "print") {
            for (const innerRule of Array.from(rule.cssRules)) {
              printRules.push(innerRule.cssText);
            }
          }
        }
      } catch {
        // Ignore cross-origin stylesheet errors
      }
    }

    const tempStyle = document.createElement("style");
    tempStyle.textContent = printRules.join("\n");
    document.head.appendChild(tempStyle);

    const prevBg = cvRef.current.style.background;
    cvRef.current.style.background = "white";

    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: 0,
        filename: `CV_DEKENI_Toha_${activeCvCategory}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(cvRef.current)
      .save();

    document.head.removeChild(tempStyle);
    cvRef.current.style.background = prevBg;
  };

  const handlePrintCV = () => {
    trackCvPrint();
    window.print();
  };

  return (
    <main className="portfolio-page special-page">
      <Header />

      {!isUnlocked ? (
        <div className="password-gate">
          <div className="password-container">
            <div className="lock-icon">
              <Lock size={48} />
            </div>
            <h1 className="password-title">
              {locale === "fr" ? "Page Spéciale" : "Special Page"}
            </h1>
            <p className="password-description">
              {locale === "fr"
                ? "Entrez le mot de passe pour accéder à cette page"
                : "Enter the password to access this page"}
            </p>

            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder={locale === "fr" ? "Mot de passe" : "Password"}
                  className={`password-input ${error ? "error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="password-error">
                  {locale === "fr" ? "Mot de passe incorrect" : "Incorrect password"}
                </p>
              )}

              <button type="submit" className="password-submit">
                {locale === "fr" ? "Accéder" : "Access"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hero-shell">
          <section className="cv-hero">
            <div className="cv-hero-container">
              <span className="eyebrow">{t("cv.eyebrow" as TranslationKey)}</span>
              <h1 className="cv-hero-title">
                {t("cv.category.label" as TranslationKey)}
              </h1>
              <div className="cv-actions">
                <button onClick={handleDownloadCV} className="btn btn-primary cv-btn">
                  <Download size={18} />
                  {t("cv.download" as TranslationKey)}
                </button>
                <button onClick={handlePrintCV} className="btn btn-ghost cv-btn">
                  <Printer size={18} />
                  {t("cv.print" as TranslationKey)}
                </button>
              </div>

              <div className="cv-category-switch">
                <span className="cv-category-label">
                  {t("cv.category.label" as TranslationKey)}
                </span>
                <div className="cv-category-buttons">
                  {cvCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`cv-category-btn ${activeCvCategory === category ? "cv-category-btn--active" : ""}`}
                      onClick={() => setActiveCvCategory(category)}
                    >
                      {t(cvCategoryLabels[category])}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <CVDocument category={activeCvCategory} cvRef={cvRef} />
        </div>
      )}
    </main>
  );
}
