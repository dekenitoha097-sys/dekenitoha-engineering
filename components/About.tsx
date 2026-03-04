"use client";

import "./About.css";
import Link from "next/link";
import { Code2, Lightbulb, FileDown, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const STATS = [
  { valueKey: "about.stat.projects.value", labelKey: "about.stat.projects" },
  { valueKey: "about.stat.experience.value", labelKey: "about.stat.experience" },
  { valueKey: "about.stat.technologies.value", labelKey: "about.stat.technologies" },
  { valueKey: "about.stat.satisfaction.value", labelKey: "about.stat.satisfaction" },
] as const;

export default function About({ showSeeMore = true }: { showSeeMore?: boolean }) {
  const { t } = useTranslation();

  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      {/* Effets de lumière en arrière-plan (Wow effect) */}
      <div className="about-bg-glow glow-1"></div>
      <div className="about-bg-glow glow-2"></div>

      <div className="about-container">
        {/* En-tête de section */}
        <header className="about-header">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 id="about-heading" className="about-title">
            {t("about.title.line1")}{" "}
            <span className="about-title-highlight">{t("about.title.highlight")}</span>
          </h2>
        </header>

        {/* Grille principale */}
        <div className="about-grid">
          {/* Colonne gauche — Texte + CTA */}
          <div className="about-text">
            <p className="about-description">{t("about.description")}</p>

            {/* Cartes passion / approche */}
            <div className="about-cards">
              <article className="about-card">
                <div className="about-card-icon">
                  <Lightbulb size={20} strokeWidth={2.5} />
                </div>
                <h3 className="about-card-title">{t("about.passion.title")}</h3>
                <p className="about-card-text">{t("about.passion.description")}</p>
              </article>
              
              <article className="about-card">
                <div className="about-card-icon">
                  <Code2 size={20} strokeWidth={2.5} />
                </div>
                <h3 className="about-card-title">{t("about.approach.title")}</h3>
                <p className="about-card-text">{t("about.approach.description")}</p>
              </article>
            </div>

            <div className="about-cta-group">
              <a href="/cv.pdf" className="btn btn-primary about-cta" download>
                <div className="cta-glow"></div>
                <FileDown size={18} strokeWidth={2.5} className="relative z-10" />
                <span className="relative z-10">{t("about.cta")}</span>
              </a>
              {showSeeMore && (
                <Link href="/about" className="btn btn-ghost about-cta-more">
                  {t("about.seeMore")}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Colonne droite — Stats */}
          <div className="about-stats">
            {STATS.map(({ valueKey, labelKey }) => (
              <article key={labelKey} className="about-stat">
                <span className="about-stat-value">{t(valueKey)}</span>
                <span className="about-stat-label">{t(labelKey)}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}