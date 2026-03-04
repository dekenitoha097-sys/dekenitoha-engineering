"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Download, Printer, MapPin, Mail, Phone, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import "./cv-page.css";

// =============================================
// 📋 DONNÉES DU CV — Modifie ici facilement !
// =============================================

// 🧑 Infos personnelles
const personalInfo = {
  photo: "/image.png",
  github: "https://github.com/dekenitoha097-sys/",
  linkedin: "https://www.linkedin.com/in/toha-dekeni-9b0599356/",
};

// 💼 Expériences — Ajoute ou supprime des objets dans cette liste
const experiences = [
  {
    periodKey: "cv.experience.1.period",
    roleKey: "cv.experience.1.role",
    companyKey: "cv.experience.1.company",
    tasksKey: "cv.experience.1.tasks",
  },
  {
    periodKey: "cv.experience.2.period",
    roleKey: "cv.experience.2.role",
    companyKey: "cv.experience.2.company",
    tasksKey: "cv.experience.2.tasks",
  },
];

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
];

// 🛠️ Compétences techniques — Ajoute des catégories ou des techs
const techSkills = {
  languages: ["C", "C++", "Python", "TypeScript", "JavaScript", "Rust", "SQL"],
  frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion", "Prisma"],
  databases: ["PostgreSQL", "SQL"],
  tools: ["Git", "Docker", "Linux", "VS Code", "Figma"],
  ai: ["TensorFlow", "Machine Learning", "Data Analysis"],
};

// 🌐 Langues — Ajoute des clés de traduction ici
const spokenLanguages = [
  "cv.languages.fr",
  "cv.languages.en",
];

// =============================================

export default function CVPage() {
  const { t } = useTranslation();
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

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
        filename: "CV_DEKENI_Toha.pdf",
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
                height={180}
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
                <Github size={14} />
                {personalInfo.github}
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
                          {t(exp.roleKey as TranslationKey)}
                        </h4>
                        <span className="cv-entry-org">
                          {t(exp.companyKey as TranslationKey)}
                        </span>
                      </div>
                      <span className="cv-entry-period">
                        {t(exp.periodKey as TranslationKey)}
                      </span>
                    </div>
                    <ul className="cv-entry-tasks">
                      {t(exp.tasksKey as TranslationKey)
                        .split("|")
                        .map((task, idx) => (
                          <li key={idx}>{task}</li>
                        ))}
                    </ul>
                  </div>
                ))}
              </section>

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
                {(Object.keys(techSkills) as (keyof typeof techSkills)[]).map((key) => (
                  <div key={key} className="cv-skill-group">
                    <h4 className="cv-skill-group-title">
                      {t(`cv.skills.${key}` as TranslationKey)}
                    </h4>
                    <div className="cv-skill-tags">
                      {techSkills[key].map((tech) => (
                        <span key={tech} className="cv-skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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