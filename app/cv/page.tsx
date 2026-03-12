"use client";

import { useRef, useState } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Download, Printer, MapPin, Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import { trackCvDownload, trackCvPrint, trackGithubVisit } from "@/lib/analytics";
import Image from "next/image";
import {
  cvExperiencesByCategory,
  cvProjectsByCategory,
  cvSkillsByCategory,
  type CvCategory,
  type CvSkillGroupKey,
  type LocalizedList,
  type LocalizedText,
} from "./cv-data";
import "./cv-page.css";

// =============================================
// 📋 DONNÉES DU CV — Modifie ici facilement !
// =============================================

// 🧑 Infos personnelles
const personalInfo = {
  photo: "/image.png",
  portfolio: "https://dekenitoha-engineering.vercel.app/",
  github: "https://github.com/dekenitoha097-sys/",
  linkedin: "https://www.linkedin.com/in/toha-dekeni-9b0599356/",
};

// 💼 Experiences — Voir app/cv/cv-data.ts
 

// 🎓 Formations — Ajoute ou supprime des objets dans cette liste
const educations = [
  {
    periodKey: "cv.education.1.period",
    degreeKey: "cv.education.1.degree",
    schoolKey: "cv.education.1.school",
    descKey: "cv.education.1.desc",
  },
  {
    periodKey: "cv.education.2.period",
    degreeKey: "cv.education.2.degree",
    schoolKey: "cv.education.2.school",
    descKey: "cv.education.2.desc",
  },
  {
    periodKey: "cv.education.3.period",
    degreeKey: "cv.education.3.degree",
    schoolKey: "cv.education.3.school",
    descKey: "cv.education.3.desc",
  },
];

// 🌐 Langues — Ajoute des clés de traduction ici
const spokenLanguages = [
  "cv.languages.fr",
  "cv.languages.en",
];

const categoryOptions: { id: CvCategory; labelKey: string }[] = [
  { id: "general", labelKey: "cv.category.general" },
  { id: "web", labelKey: "cv.category.web" },
  { id: "ai", labelKey: "cv.category.ai" },
  { id: "games", labelKey: "cv.category.games" },
];

const skillGroupOrder: CvSkillGroupKey[] = ["languages", "frameworks", "databases", "tools", "ai"];

// =============================================

export default function CVPage() {
  const { t, locale } = useTranslation();
  const cvRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CvCategory>("general");

  const isFr = locale === "fr";
  const getText = (text: LocalizedText) => (isFr ? text.fr : text.en);
  const getList = (list: LocalizedList) => (isFr ? list.fr : list.en);

  const experiences = cvExperiencesByCategory[activeCategory];
  const projects = cvProjectsByCategory[activeCategory];
  const skills = cvSkillsByCategory[activeCategory];
  const visibleSkillGroups = skillGroupOrder.filter((key) => skills[key]?.length > 0);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    // Track CV download
    trackCvDownload();

    // Extraire les règles @media print et les appliquer temporairement à l'écran
    const printRules: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule instanceof CSSMediaRule && rule.conditionText === "print") {
            for (const innerRule of Array.from(rule.cssRules)) {
              printRules.push(innerRule.cssText);
            }
          }
        }
      } catch {
        // Ignore cross-origin stylesheet errors
      }
    }

    const tempStyle = document.createElement("style");
    tempStyle.textContent = printRules.join("\n");
    document.head.appendChild(tempStyle);

    // Forcer le fond blanc sur le document CV
    const prevBg = cvRef.current.style.background;
    cvRef.current.style.background = "white";

    // Attendre le rendu
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: 0,
        filename: `CV_DEKENI_Toha_${activeCategory}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(cvRef.current)
      .save();

    // Nettoyer les styles temporaires
    document.head.removeChild(tempStyle);
    cvRef.current.style.background = prevBg;
  };

  const handlePrint = () => {
    trackCvPrint();
    window.print();
  };

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* Header actions */}
        <section className="cv-hero">
          <div className="cv-hero-container">
            <span className="eyebrow">{t("cv.eyebrow" as TranslationKey)}</span>
            <h1 className="cv-hero-title">
              {t("cv.title" as TranslationKey)}{" "}
              <span className="cv-hero-highlight">
                {t("cv.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <div className="cv-actions">
              <button onClick={handleDownloadPDF} className="btn btn-primary cv-btn">
                <Download size={18} />
                {t("cv.download" as TranslationKey)}
              </button>
              <button onClick={handlePrint} className="btn btn-ghost cv-btn">
                <Printer size={18} />
                {t("cv.print" as TranslationKey)}
              </button>
            </div>
            <div className="cv-category-switch">
              <span className="cv-category-label">
                {t("cv.category.label" as TranslationKey)}
              </span>
              <div className="cv-category-buttons">
                {categoryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`cv-category-btn ${activeCategory === option.id ? "cv-category-btn--active" : ""}`}
                    onClick={() => setActiveCategory(option.id)}
                  >
                    {t(option.labelKey as TranslationKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CV Document */}
        <div className="cv-document" ref={cvRef}>
          {/* CV Header */}
          <header className="cv-doc-header">
            <div className="cv-photo">
              <Image
                src={personalInfo.photo}
                alt={t("cv.name" as TranslationKey)}
                width={180}
                height={200}
                className="cv-photo-img"
              />
            </div>
            <div className="cv-identity">
              <h2 className="cv-name">{t("cv.name" as TranslationKey)}</h2>
              <p className="cv-role">{t("cv.role" as TranslationKey)}</p>
            </div>
            <div className="cv-contact-info">
              <span className="cv-contact-item">
                <MapPin size={14} />
                {t("cv.location" as TranslationKey)}
              </span>
              <span className="cv-contact-item">
                <Mail size={14} />
                {t("cv.email" as TranslationKey)}
              </span>
              <span className="cv-contact-item">
                <Phone size={14} />
                {t("cv.phone" as TranslationKey)}
              </span>
              <span className="cv-contact-item">
                <Globe size={14} />
                {personalInfo.portfolio}
              </span>
              <span className="cv-contact-item">
                <Github size={14} />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" onClick={trackGithubVisit}>
                  {personalInfo.github}
                </a>
              </span>
              <span className="cv-contact-item">
                <Linkedin size={14} />
                {personalInfo.linkedin}
              </span>
            </div>
          </header>

          <div className="cv-doc-body">
            {/* Left Column */}
            <div className="cv-main">
              {/* Profile */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.profile.title" as TranslationKey)}
                </h3>
                <p className="cv-profile-text">
                  {t("cv.profile.text" as TranslationKey)}
                </p>
              </section>

              {/* Experience */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.experience.title" as TranslationKey)}
                </h3>
                {experiences.map((exp, i) => (
                  <div key={i} className="cv-entry">
                    <div className="cv-entry-header">
                      <div>
                        <h4 className="cv-entry-title">
                          {getText(exp.role)}
                        </h4>
                        <span className="cv-entry-org">
                          {getText(exp.company)}
                        </span>
                      </div>
                      <span className="cv-entry-period">
                        {getText(exp.period)}
                      </span>
                    </div>
                    <ul className="cv-entry-tasks">
                      {getList(exp.tasks).map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Projects */}
              {projects.length > 0 && (
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    {t("cv.projects.title" as TranslationKey)}
                  </h3>
                  {projects.map((project, i) => (
                    <div key={`${project.title.en}-${i}`} className="cv-entry cv-project-entry">
                      <div className="cv-entry-header">
                        <div>
                          <h4 className="cv-entry-title">
                            {getText(project.title)}
                          </h4>
                        </div>
                      </div>
                      <p className="cv-entry-desc">
                        {getText(project.description)}
                      </p>
                      <div className="cv-project-techs">
                        {project.techs.map((tech) => (
                          <span key={tech} className="cv-project-tech">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Education */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.education.title" as TranslationKey)}
                </h3>
                {educations.map((edu, i) => (
                  <div key={i} className="cv-entry">
                    <div className="cv-entry-header">
                      <div>
                        <h4 className="cv-entry-title">
                          {t(edu.degreeKey as TranslationKey)}
                        </h4>
                        <span className="cv-entry-org">
                          {t(edu.schoolKey as TranslationKey)}
                        </span>
                      </div>
                      <span className="cv-entry-period">
                        {t(edu.periodKey as TranslationKey)}
                      </span>
                    </div>
                    <p className="cv-entry-desc">
                      {t(edu.descKey as TranslationKey)}
                    </p>
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <aside className="cv-sidebar">
              {/* Technical Skills */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.skills.title" as TranslationKey)}
                </h3>
                {visibleSkillGroups.map((key) => (
                  <div key={key} className="cv-skill-group">
                    <h4 className="cv-skill-group-title">
                      {t(`cv.skills.${key}` as TranslationKey)}
                    </h4>
                    <div className="cv-skill-tags">
                      {skills[key].map((tech) => (
                        <span key={tech} className="cv-skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Soft Skills */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.softskills.title" as TranslationKey)}
                </h3>
                <div className="cv-softskills-list">
                  {t("cv.softskills.list" as TranslationKey)
                    .split("|")
                    .map((skill, idx) => (
                      <div key={idx} className="cv-softskill-item">
                        <span className="cv-softskill-bullet">•</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                </div>
              </section>

              {/* Languages */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.languages.title" as TranslationKey)}
                </h3>
                <ul className="cv-lang-list">
                  {spokenLanguages.map((langKey) => (
                    <li key={langKey}>{t(langKey as TranslationKey)}</li>
                  ))}
                </ul>
              </section>

              {/* Interests */}
              <section className="cv-section">
                <h3 className="cv-section-title">
                  {t("cv.interests.title" as TranslationKey)}
                </h3>
                <div className="cv-interest-tags">
                  {t("cv.interests.list" as TranslationKey)
                    .split("|")
                    .map((interest, idx) => (
                      <span key={idx} className="cv-interest-tag">
                        {interest}
                      </span>
                    ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
