"use client";

import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { GraduationCap, Briefcase, Rocket, Code2 } from "lucide-react";
import "./Timeline.css";

const timelineItems = [
  { id: 1, icon: GraduationCap, type: "education" as const },
  { id: 2, icon: GraduationCap, type: "education" as const },
  { id: 3, icon: Briefcase, type: "work" as const },
  { id: 4, icon: Rocket, type: "origin" as const },
];

export default function Timeline() {
  const { t } = useTranslation();

  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-header">
          <span className="eyebrow">
            {t("aboutPage.timeline.eyebrow" as TranslationKey)}
          </span>
          <h2 className="timeline-title">
            {t("aboutPage.timeline.title" as TranslationKey)}{" "}
            <span className="timeline-title-highlight">
              {t("aboutPage.timeline.titleHighlight" as TranslationKey)}
            </span>
          </h2>
        </div>

        <div className="timeline-track">
          <div className="timeline-line" />
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className="timeline-dot">
                  <Icon size={18} />
                </div>
                <div className="timeline-card">
                  <span className="timeline-year">
                    {t(`aboutPage.timeline.${item.id}.year` as TranslationKey)}
                  </span>
                  <h3 className="timeline-card-title">
                    {t(`aboutPage.timeline.${item.id}.title` as TranslationKey)}
                  </h3>
                  <p className="timeline-card-desc">
                    {t(`aboutPage.timeline.${item.id}.description` as TranslationKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
