"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Award, ExternalLink, Shield } from "lucide-react";
import "./certifications-page.css";

// Données des certificats
const certsList = [
  {
    id: 1,
    image: "/courcera-certificats/developpement_web.png",
    link: "https://coursera.org/verify/placeholder-1",
    platform: "Coursera",
    color: "#0070f3",
  },
  {
    id: 2,
    image: "/courcera-certificats/communication.png",
    link: "https://coursera.org/verify/placeholder-2",
    platform: "Coursera",
    color: "#a855f7",
  },
  {
    id: 3,
    image: "/courcera-certificats/network_and_security.png",
    link: "https://coursera.org/verify/placeholder-3",
    platform: "Coursera",
    color: "#22c55e",
  },
  {
    id: 4,
    image: "/courcera-certificats/project_management.png",
    link: "https://coursera.org/verify/placeholder-4",
    platform: "Coursera",
    color: "#f97316",
  },
];

export default function CertificationsPage() {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const totalCerts = certsList.length;
  const platforms = [...new Set(certsList.map((c) => c.platform))].length;

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* ── Hero ── */}
        <section className="cp-hero">
          <div className="cp-hero-orb cp-orb-1" />
          <div className="cp-hero-orb cp-orb-2" />
          <div className="cp-hero-orb cp-orb-3" />

          <div className="cp-hero-container">
            <span className="eyebrow">
              {t("certificationsPage.eyebrow" as TranslationKey)}
            </span>
            <h1 className="cp-hero-title">
              {t("certificationsPage.title" as TranslationKey)}{" "}
              <span className="cp-hero-highlight">
                {t("certificationsPage.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="cp-hero-intro">
              {t("certificationsPage.intro" as TranslationKey)}
            </p>

            {/* Stats */}
            <div className="cp-stats-row">
              <div className="cp-stat">
                <span className="cp-stat-value">{totalCerts}</span>
                <span className="cp-stat-label">
                  {t("certificationsPage.stats.total" as TranslationKey)}
                </span>
              </div>
              <div className="cp-stat-divider" />
              <div className="cp-stat">
                <span className="cp-stat-value">{platforms}</span>
                <span className="cp-stat-label">
                  {t("certificationsPage.stats.platforms" as TranslationKey)}
                </span>
              </div>
              <div className="cp-stat-divider" />
              <div className="cp-stat">
                <span className="cp-stat-value">2024</span>
                <span className="cp-stat-label">
                  {t("certificationsPage.stats.year" as TranslationKey)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications Grid ── */}
        <div className="cp-grid-section">
          <div className="cp-grid">
            {certsList.map((cert, idx) => (
              <article
                key={cert.id}
                className={`cp-card ${expandedId === cert.id ? "cp-card--expanded" : ""}`}
                style={{
                  animationDelay: `${0.05 + idx * 0.1}s`,
                  "--cert-accent": cert.color,
                } as React.CSSProperties}
                onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
              >
                {/* Accent line */}
                <div className="cp-card-accent" />

                {/* Image */}
                <div className="cp-card-image-wrap">
                  <img
                    src={cert.image}
                    alt={t(`cert.${cert.id}.title` as TranslationKey)}
                    className="cp-card-image"
                  />
                  <div className="cp-card-badge">
                    <Award size={20} />
                  </div>
                  <div className="cp-card-shine" />
                </div>

                {/* Content */}
                <div className="cp-card-content">
                  <div className="cp-card-meta">
                    <span className="cp-card-platform">
                      <Shield size={12} />
                      {t(`cert.${cert.id}.issuer` as TranslationKey)}
                    </span>
                    <span className="cp-card-date">
                      {t(`cert.${cert.id}.date` as TranslationKey)}
                    </span>
                  </div>

                  <h2 className="cp-card-title">
                    {t(`cert.${cert.id}.title` as TranslationKey)}
                  </h2>

                  <p className="cp-card-desc">
                    {t(`cert.${cert.id}.desc` as TranslationKey)}
                  </p>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-card-action"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={15} />
                    {t("certificationsPage.viewCredential" as TranslationKey)}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
