"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import "./skills-page.css";

type SkillLevel = "advanced" | "intermediate" | "beginner" | "learning";

interface SkillItem {
  name: string;
  icon: string;
  level: SkillLevel;
  descKey: string;
}

interface SkillCategory {
  key: string;
  titleKey: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    key: "software",
    titleKey: "skillsPage.software.title",
    skills: [
      { name: "C", icon: "devicon-c-plain colored", level: "intermediate", descKey: "skillsPage.software.c.desc" },
      { name: "C++", icon: "devicon-cplusplus-plain colored", level: "intermediate", descKey: "skillsPage.software.cpp.desc" },
      { name: "Python (scripting avance)", icon: "devicon-python-plain colored", level: "advanced", descKey: "skillsPage.software.python.desc" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored", level: "advanced", descKey: "skillsPage.software.ts.desc" },
      { name: "Rust", icon: "devicon-rust-original", level: "learning", descKey: "skillsPage.software.rust.desc" },
      { name: "Java", icon: "devicon-java-plain colored", level: "intermediate", descKey: "skillsPage.software.java.desc" },
      { name: "Algorithmique", icon: "devicon-thealgorithms-plain", level: "intermediate", descKey: "skillsPage.software.algo.desc" },
    ],
  },
  {
    key: "web",
    titleKey: "skillsPage.web.title",
    skills: [
      { name: "React", icon: "devicon-react-original colored", level: "advanced", descKey: "skillsPage.web.react.desc" },
      { name: "Next.js", icon: "devicon-nextjs-plain", level: "advanced", descKey: "skillsPage.web.next.desc" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored", level: "advanced", descKey: "skillsPage.web.node.desc" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", level: "advanced", descKey: "skillsPage.web.tailwind.desc" },
      { name: "HTML5", icon: "devicon-html5-plain colored", level: "advanced", descKey: "skillsPage.web.html.desc" },
      { name: "CSS3", icon: "devicon-css3-plain colored", level: "advanced", descKey: "skillsPage.web.css.desc" },
    ],
  },
  {
    key: "ai",
    titleKey: "skillsPage.ai.title",
    skills: [
      { name: "Machine Learning", icon: "devicon-python-plain colored", level: "intermediate", descKey: "skillsPage.ai.ml.desc" },
      { name: "Scikit-learn", icon: "devicon-python-plain colored", level: "beginner", descKey: "skillsPage.ai.sklearn.desc" },
      { name: "Data Analysis", icon: "devicon-pandas-plain", level: "beginner", descKey: "skillsPage.ai.data.desc" },
      { name: "NumPy", icon: "devicon-numpy-plain", level: "advanced", descKey: "skillsPage.ai.numpy.desc" },
      { name: "Pandas", icon: "devicon-pandas-plain", level: "advanced", descKey: "skillsPage.ai.pandas.desc" },
      { name: "Matplotlib", icon: "devicon-matplotlib-plain", level: "advanced", descKey: "skillsPage.ai.matplotlib.desc" },
    ],
  },
  {
    key: "db",
    titleKey: "skillsPage.db.title",
    skills: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", level: "intermediate", descKey: "skillsPage.db.pg.desc" },
      { name: "MySQL", icon: "devicon-mysql-plain colored", level: "intermediate", descKey: "skillsPage.db.mysql.desc" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain colored", level: "advanced", descKey: "skillsPage.db.sql.desc" },
    ],
  },
  {
    key: "tools",
    titleKey: "skillsPage.tools.title",
    skills: [
      { name: "Git", icon: "devicon-git-plain colored", level: "advanced", descKey: "skillsPage.tools.git.desc" },
      { name: "Docker", icon: "devicon-docker-plain colored", level: "beginner", descKey: "skillsPage.tools.docker.desc" },
      { name: "Linux", icon: "devicon-linux-plain", level: "advanced", descKey: "skillsPage.tools.linux.desc" },
      { name: "VS Code", icon: "devicon-vscode-plain colored", level: "advanced", descKey: "skillsPage.tools.vscode.desc" },
    ],
  },
  {
    key: "soft",
    titleKey: "skillsPage.soft.title",
    skills: [
      { name: "Travail en équipe", icon: "devicon-github-plain", level: "advanced", descKey: "skillsPage.soft.teamwork.desc" },
      { name: "Communication", icon: "devicon-github-plain", level: "advanced", descKey: "skillsPage.soft.communication.desc" },
      { name: "Résolution de problèmes", icon: "devicon-github-plain", level: "advanced", descKey: "skillsPage.soft.problem.desc" },
      { name: "Apprentissage autonome", icon: "devicon-github-plain", level: "advanced", descKey: "skillsPage.soft.learning.desc" },
      { name: "Gestion de projets", icon: "devicon-github-plain", level: "intermediate", descKey: "skillsPage.soft.project.desc" },
      { name: "Curiosité technique", icon: "devicon-github-plain", level: "advanced", descKey: "skillsPage.soft.curiosity.desc" },
    ],
  },
];

const levelColors: Record<SkillLevel, string> = {
  advanced: "#34d399",
  intermediate: "#60a5fa",
  beginner: "#f59e0b",
  learning: "#c084fc",
};

export default function SkillsPage() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { key: "all", labelKey: "skillsPage.filter.all" },
    ...skillCategories.map((cat) => ({ key: cat.key, labelKey: cat.titleKey })),
  ];

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.key === activeFilter);

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        <section className="sp-hero">
          <div className="sp-hero-container">
            <span className="eyebrow">
              {t("skillsPage.eyebrow" as TranslationKey)}
            </span>
            <h1 className="sp-hero-title">
              {t("skillsPage.title" as TranslationKey)}{" "}
              <span className="sp-hero-highlight">
                {t("skillsPage.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="sp-hero-intro">
              {t("skillsPage.intro" as TranslationKey)}
            </p>

            <div className="sp-filters">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`sp-filter-btn ${activeFilter === tab.key ? "active" : ""}`}
                  onClick={() => setActiveFilter(tab.key)}
                >
                  {t(tab.labelKey as TranslationKey)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="sp-categories">
          {filteredCategories.map((cat, catIdx) => (
            <section
              key={cat.titleKey}
              className="sp-category"
              style={{ animationDelay: `${0.1 + catIdx * 0.1}s` }}
            >
              <h2 className="sp-category-title">
                {t(cat.titleKey as TranslationKey)}
              </h2>
              <div className="sp-skills-list">
                {cat.skills.map((skill, skillIdx) => (
                  <article
                    key={skill.name}
                    className="sp-skill-card"
                    style={{ animationDelay: `${0.2 + catIdx * 0.1 + skillIdx * 0.05}s` }}
                  >
                    <div className="sp-skill-top">
                      <div className="sp-skill-icon">
                        <i className={skill.icon} />
                      </div>
                      <div className="sp-skill-info">
                        <h3 className="sp-skill-name">{skill.name}</h3>
                        <span
                          className="sp-skill-level"
                          style={{
                            color: levelColors[skill.level],
                            borderColor: levelColors[skill.level],
                          }}
                        >
                          {t(`skillsPage.level.${skill.level}` as TranslationKey)}
                        </span>
                      </div>
                    </div>
                    <p className="sp-skill-desc">
                      {t(skill.descKey as TranslationKey)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
