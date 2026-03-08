"use client";

import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import "./TechStack.css";

const techCategories = [
  {
    key: "software",
    techs: [
      { name: "C", icon: "devicon-c-plain colored" },
      { name: "C++", icon: "devicon-cplusplus-plain colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "Rust", icon: "devicon-rust-original" },
      { name: "Java", icon: "devicon-java-plain colored" },
    ],
  },
  {
    key: "web",
    techs: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
      { name: "HTML", icon: "devicon-html5-plain colored" },
      { name: "CSS", icon: "devicon-css3-plain colored" },
      { name: "Framer Motion", icon: "devicon-framermotion-original" },
    ],
  },
  {
    key: "ai",
    techs: [
      { name: "Machine Learning", icon: "devicon-python-plain colored" },
      { name: "Scikit-learn", icon: "devicon-python-plain colored" },
      { name: "NumPy", icon: "devicon-numpy-plain" },
      { name: "Pandas", icon: "devicon-pandas-plain" },
      { name: "Matplotlib", icon: "devicon-matplotlib-plain" },
    ],
  },
  {
    key: "databases",
    techs: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain colored" },
    ],
  },
  {
    key: "tools",
    techs: [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Linux", icon: "devicon-linux-plain" },
      { name: "VS Code", icon: "devicon-vscode-plain colored" },
    ],
  },
];

export default function TechStack() {
  const { t } = useTranslation();

  return (
    <section className="techstack-section">
      <div className="techstack-container">
        <div className="techstack-header">
          <span className="eyebrow">
            {t("aboutPage.tech.eyebrow" as TranslationKey)}
          </span>
          <h2 className="techstack-title">
            {t("aboutPage.tech.title" as TranslationKey)}{" "}
            <span className="techstack-title-highlight">
              {t("aboutPage.tech.titleHighlight" as TranslationKey)}
            </span>
          </h2>
        </div>

        <div className="techstack-grid">
          {techCategories.map((category, catIndex) => (
            <div
              key={category.key}
              className="techstack-category"
              style={{ animationDelay: `${0.2 + catIndex * 0.1}s` }}
            >
              <h3 className="techstack-category-title">
                {t(`aboutPage.tech.${category.key}` as TranslationKey)}
              </h3>
              <div className="techstack-pills">
                {category.techs.map((tech) => (
                  <span key={tech.name} className="techstack-pill">
                    <i className={`${tech.icon} techstack-pill-icon`} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
