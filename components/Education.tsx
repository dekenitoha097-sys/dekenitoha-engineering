"use client";

import "./Education.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { GraduationCap, ArrowRight, Calendar, MapPin } from "lucide-react";

const educationCards = [
  { id: 1, current: true },
  { id: 2, current: false },
  { id: 3, current: false },
];

export default function Education() {
  const { t } = useTranslation();

  return (
    <section className="education" id="education" aria-labelledby="education-heading">
      <div className="education-bg-glow edu-glow-1" />
      <div className="education-bg-glow edu-glow-2" />

      <div className="education-container">
        <header className="education-header">
          <span className="eyebrow">
            {t("education.eyebrow" as TranslationKey)}
          </span>
          <h2 id="education-heading" className="education-title">
            {t("education.title" as TranslationKey)}{" "}
            <span className="education-title-highlight">
              {t("education.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="education-description">
            {t("education.description" as TranslationKey)}
          </p>
        </header>

        <div className="education-timeline">
          <div className="education-timeline-line" />
          {educationCards.map((card, i) => (
            <article
              key={card.id}
              className={`education-card ${card.current ? "education-card--current" : ""}`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="education-card-dot">
                <GraduationCap size={18} />
              </div>
              <div className="education-card-content">
                <div className="education-card-meta">
                  <span className="education-card-period">
                    <Calendar size={14} />
                    {t(`education.card.${card.id}.period` as TranslationKey)}
                  </span>
                  {card.current && (
                    <span className="education-card-badge">
                      {t("educationPage.current" as TranslationKey)}
                    </span>
                  )}
                </div>
                <h3 className="education-card-degree">
                  {t(`education.card.${card.id}.degree` as TranslationKey)}
                </h3>
                <p className="education-card-school">
                  <MapPin size={14} />
                  {t(`education.card.${card.id}.school` as TranslationKey)}
                </p>
                <p className="education-card-desc">
                  {t(`education.card.${card.id}.desc` as TranslationKey)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="education-cta-wrapper">
          <Link href="/education" className="btn btn-ghost education-cta">
            {t("education.seeMore" as TranslationKey)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
