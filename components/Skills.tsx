"use client";

import "./Skills.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    key: "software",
    icon: "devicon-c-plain",
    techs: ["C", "C++", "Python", "TypeScript", "Rust", "Java"],
  },
  {
    key: "web",
    icon: "devicon-react-original",
    techs: ["React", "Next.js", "Node.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    key: "ai",
    icon: "devicon-python-plain",
    techs: ["Machine Learning", "Scikit-learn", "NumPy", "Pandas", "Matplotlib"],
  },
  {
    key: "db",
    icon: "devicon-postgresql-plain",
    techs: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    key: "tools",
    icon: "devicon-git-plain",
    techs: ["Git", "Docker", "Linux", "VS Code"],
  },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section className="skills" id="skills" aria-labelledby="skills-heading">
      <div className="skills-container">
        <header className="skills-header">
          <span className="eyebrow">
            {t("skills.eyebrow" as TranslationKey)}
          </span>
          <h2 id="skills-heading" className="skills-title">
            {t("skills.title" as TranslationKey)}{" "}
            <span className="skills-title-highlight">
              {t("skills.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="skills-description">
            {t("skills.description" as TranslationKey)}
          </p>
        </header>

        <div className="skills-grid">
          {categories.map((cat, i) => (
            <article
              key={cat.key}
              className="skills-card"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="skills-card-icon">
                <i className={`${cat.icon} colored`} />
              </div>
              <h3 className="skills-card-title">
                {t(`skills.cat.${cat.key}` as TranslationKey)}
              </h3>
              <div className="skills-card-techs">
                {cat.techs.map((tech) => (
                  <span key={tech} className="skills-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="skills-cta-wrapper">
          <Link href="/skills" className="btn btn-ghost skills-cta">
            {t("skills.seeMore" as TranslationKey)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
