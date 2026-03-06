"use client";

import Header from "@/components/Header";
import Timeline from "./components/Timeline";
import TechStack from "./components/TechStack";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { MapPin, Sparkles } from "lucide-react";
import "./about-page.css";

export default function AboutPage() {
  const { t, locale } = useTranslation();

  const highlights =
    locale === "fr"
      ? [
          {
            title: "Focus Academique",
            text: "Formation orientee ingenierie logicielle, intelligence artificielle et architecture web moderne.",
          },
          {
            title: "Methodologie",
            text: "Travail structure: analyse du besoin, conception claire, implementation propre et validation continue.",
          },
          {
            title: "Objectif Etudiant",
            text: "Construire un profil d'ingenieur fiable avec des projets techniques solides et mesurables.",
          },
        ]
      : [
          {
            title: "Academic Focus",
            text: "Training centered on software engineering, artificial intelligence, and modern web architecture.",
          },
          {
            title: "Methodology",
            text: "Structured workflow: requirement analysis, clear design, clean implementation, and continuous validation.",
          },
          {
            title: "Student Goal",
            text: "Build a reliable engineering profile with strong, measurable technical projects.",
          },
        ];

  const stats = [
    { valueKey: "about.stat.projects.value", labelKey: "about.stat.projects" },
    { valueKey: "about.stat.experience.value", labelKey: "about.stat.experience" },
    { valueKey: "about.stat.technologies.value", labelKey: "about.stat.technologies" },
    { valueKey: "about.stat.satisfaction.value", labelKey: "about.stat.satisfaction" },
  ] as const;

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        <section className="about-page-hero">
          <div className="about-page-hero-container">
            <span className="eyebrow">
              {t("aboutPage.hero.eyebrow" as TranslationKey)}
            </span>
            <h1 className="about-page-hero-title">
              {t("aboutPage.hero.title" as TranslationKey)}{" "}
              <span className="about-page-hero-highlight">
                {t("aboutPage.hero.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="about-page-hero-bio">
              {t("aboutPage.hero.bio" as TranslationKey)}
            </p>
            <div className="about-page-hero-meta">
              <span className="about-page-meta-item">
                <MapPin size={16} />
                {t("aboutPage.hero.location" as TranslationKey)}
              </span>
              <span className="about-page-meta-item status">
                <Sparkles size={16} />
                {t("aboutPage.hero.status" as TranslationKey)}
              </span>
            </div>
          </div>
        </section>

        <section className="about-page-highlights" aria-label="Profile highlights">
          <div className="about-page-highlights-grid">
            {highlights.map((item) => (
              <article key={item.title} className="about-page-highlight-card">
                <h2 className="about-page-highlight-title">{item.title}</h2>
                <p className="about-page-highlight-text">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="about-page-kpis" aria-label="Academic stats">
            {stats.map(({ valueKey, labelKey }) => (
              <article key={labelKey} className="about-page-kpi-card">
                <span className="about-page-kpi-value">{t(valueKey as TranslationKey)}</span>
                <span className="about-page-kpi-label">{t(labelKey as TranslationKey)}</span>
              </article>
            ))}
          </div>
        </section>

        <Timeline />
        <TechStack />
      </div>
    </main>
  );
}
