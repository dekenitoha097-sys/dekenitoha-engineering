"use client";

import Header from "@/components/Header";
import About from "@/components/About";
import Timeline from "./components/Timeline";
import TechStack from "./components/TechStack";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { MapPin, Sparkles } from "lucide-react";
import "./about-page.css";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* Hero d'introduction détaillée */}
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

        {/* Réutilisation du composant About existant */}
        <About showSeeMore={false} />

        {/* Parcours / Timeline */}
        <Timeline />

        {/* Stack Technique */}
        <TechStack />
      </div>
    </main>
  );
}