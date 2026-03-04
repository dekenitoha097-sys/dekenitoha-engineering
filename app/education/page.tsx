"use client";

import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { GraduationCap, MapPin, BookOpen, Trophy, Calendar } from "lucide-react";
import "./education-page.css";

const educationItems = [
  { id: 1, current: true },
  { id: 2, current: false },
  { id: 3, current: false },
];

export default function EducationPage() {
  const { t } = useTranslation();

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* Hero */}
        <section className="edu-hero">
          <div className="edu-hero-container">
            <span className="eyebrow">
              {t("educationPage.eyebrow" as TranslationKey)}
            </span>
            <h1 className="edu-hero-title">
              {t("educationPage.title" as TranslationKey)}{" "}
              <span className="edu-hero-highlight">
                {t("educationPage.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="edu-hero-intro">
              {t("educationPage.intro" as TranslationKey)}
            </p>
          </div>
        </section>

        {/* Timeline détaillée */}
        <div className="edu-timeline">
          <div className="edu-timeline-line" />

          {educationItems.map((item, idx) => {
            const courses = t(`educationPage.item.${item.id}.courses` as TranslationKey).split("|");
            const achievements = t(`educationPage.item.${item.id}.achievements` as TranslationKey).split("|");

            return (
              <article
                key={item.id}
                className={`edu-item ${item.current ? "edu-item--current" : ""}`}
                style={{ animationDelay: `${0.15 + idx * 0.12}s` }}
              >
                {/* Dot on timeline */}
                <div className="edu-item-dot">
                  <GraduationCap size={20} />
                </div>

                {/* Card */}
                <div className="edu-item-card">
                  {/* Header */}
                  <div className="edu-item-header">
                    <div className="edu-item-meta">
                      <span className="edu-item-period">
                        <Calendar size={14} />
                        {t(`educationPage.item.${item.id}.period` as TranslationKey)}
                      </span>
                      {item.current && (
                        <span className="edu-item-badge">
                          {t("educationPage.current" as TranslationKey)}
                        </span>
                      )}
                    </div>
                    <h2 className="edu-item-degree">
                      {t(`educationPage.item.${item.id}.degree` as TranslationKey)}
                    </h2>
                    <div className="edu-item-school-row">
                      <span className="edu-item-school">
                        <GraduationCap size={15} />
                        {t(`educationPage.item.${item.id}.school` as TranslationKey)}
                      </span>
                      <span className="edu-item-location">
                        <MapPin size={14} />
                        {t(`educationPage.item.${item.id}.location` as TranslationKey)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="edu-item-description">
                    {t(`educationPage.item.${item.id}.description` as TranslationKey)}
                  </p>

                  {/* Courses */}
                  <div className="edu-item-section">
                    <h3 className="edu-item-section-title">
                      <BookOpen size={16} />
                      {t("educationPage.coursesLabel" as TranslationKey)}
                    </h3>
                    <div className="edu-item-tags">
                      {courses.map((course) => (
                        <span key={course} className="edu-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="edu-item-section">
                    <h3 className="edu-item-section-title">
                      <Trophy size={16} />
                      {t("educationPage.achievementsLabel" as TranslationKey)}
                    </h3>
                    <ul className="edu-item-achievements">
                      {achievements.map((achievement) => (
                        <li key={achievement} className="edu-achievement">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
