"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Github, ExternalLink, Layers, Code2, Sparkles } from "lucide-react";
import "./projects-page.css";

// =============================================
// 📋 DONNÉES PROJETS — Modifie / ajoute ici !
// =============================================

// Types
type DomainFilter = "all" | "web" | "ai" | "tools" | "academic" | "games";
type LangFilter = "all" | "typescript" | "python" | "rust" | "cpp" | "javascript";

interface Project {
  id: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  domain: DomainFilter;
  lang: LangFilter;
  techs: string[];
  github: string;
  demo: string;
  featured: boolean;
  year: number;
  color: string; // gradient accent pour chaque projet
  image: string; // chemin vers l'image du projet (dans /public)
}

// 🎨 Couleurs par domaine
const domainColors: Record<string, string> = {
  web: "from-blue-accent",
  ai: "from-purple-accent",
  tools: "from-orange-accent",
  academic: "from-green-accent",
  games: "from-pink-accent",
};

// Liste des projets — AJOUTE DES OBJETS ICI POUR AJOUTER DES PROJETS
const projectsList: Project[] = [
  {
    id: "portfolio",
    titleFr: "Portfolio Personnel",
    titleEn: "Personal Portfolio",
    descFr:
      "Site portfolio next-gen avec Next.js, design glassmorphism, bilingue FR/EN, système i18n custom, génération PDF du CV, styles d'impression premium.",
    descEn:
      "Next-gen portfolio site with Next.js, glassmorphism design, bilingual FR/EN, custom i18n system, CV PDF generation, premium print styles.",
    domain: "web",
    lang: "typescript",
    techs: ["Next.js", "TypeScript", "CSS", "html2pdf.js"],
    github: "https://github.com/dekenimawuli/portfolio",
    demo: "https://dekeni.dev",
    featured: true,
    year: 2025,
    color: "#0070f3",
    image: "/projects/portfolio.jpg",

  },
  {
    id: "ai-classifier",
    titleFr: "Classificateur d'Images IA",
    titleEn: "AI Image Classifier",
    descFr:
      "Classification d'images par CNN avec TensorFlow. Interface React avec upload, visualisation des prédictions et métriques de confiance en temps réel.",
    descEn:
      "Image classification using CNN with TensorFlow. React interface with upload, live prediction visualization and confidence metrics.",
    domain: "ai",
    lang: "python",
    techs: ["Python", "TensorFlow", "React", "Tailwind CSS"],
    github: "https://github.com/dekenimawuli/ai-classifier",
    demo: "",
    featured: true,
    year: 2024,
    color: "#a855f7",
    image: "/projects/ai-classifier.jpg",
  },
  {
    id: "task-manager",
    titleFr: "Gestionnaire de Tâches Full Stack",
    titleEn: "Full Stack Task Manager",
    descFr:
      "App full stack avec auth, CRUD complet, catégorisation, priorités, drag & drop, et interface responsive avec animations fluides.",
    descEn:
      "Full stack app with auth, complete CRUD, categorization, priorities, drag & drop, and responsive interface with fluid animations.",
    domain: "web",
    lang: "typescript",
    techs: ["React", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/dekenimawuli/task-manager",
    demo: "https://task-manager.dekeni.dev",
    featured: true,
    year: 2024,
    color: "#0070f3",
    image: "/projects/task-manager.jpg",
  },
  {
    id: "cli-tool",
    titleFr: "Dev CLI — Automatisation Rust",
    titleEn: "Dev CLI — Rust Automation",
    descFr:
      "Outil CLI haute performance en Rust : scaffold de projets, gestion de fichiers, formatage de code, avec système de plugins extensible.",
    descEn:
      "High-performance CLI tool in Rust: project scaffolding, file management, code formatting, with extensible plugin system.",
    domain: "tools",
    lang: "rust",
    techs: ["Rust", "CLI", "Cargo"],
    github: "https://github.com/dekenimawuli/cli-tool",
    demo: "",
    featured: false,
    year: 2024,
    color: "#f97316",
    image: "/projects/cli-tool.jpg",
  },
  {
    id: "data-analysis",
    titleFr: "Analyse de Données Exploratoire",
    titleEn: "Exploratory Data Analysis",
    descFr:
      "Projet universitaire : nettoyage de données massif, statistiques descriptives, visualisations interactives avec matplotlib et pandas.",
    descEn:
      "University project: massive data cleaning, descriptive statistics, interactive visualizations with matplotlib and pandas.",
    domain: "academic",
    lang: "python",
    techs: ["Python", "Pandas", "Matplotlib", "NumPy"],
    github: "https://github.com/dekenimawuli/data-analysis",
    demo: "",
    featured: false,
    year: 2024,
    color: "#22c55e",
    image: "/projects/data-analysis.jpg",
  },
  {
    id: "chat-app",
    titleFr: "Chat Temps Réel",
    titleEn: "Real-Time Chat",
    descFr:
      "Chat en temps réel avec WebSocket : salles privées, indicateur de frappe, notifications push, et thème sombre élégant.",
    descEn:
      "Real-time chat with WebSocket: private rooms, typing indicator, push notifications, and elegant dark theme.",
    domain: "web",
    lang: "javascript",
    techs: ["React", "Node.js", "WebSocket", "CSS"],
    github: "https://github.com/dekenimawuli/chat-app",
    demo: "https://chat.dekeni.dev",
    featured: false,
    year: 2023,
    color: "#0070f3",
    image: "/projects/chat-app.jpg",
  },
];

// Filtres disponibles
const domainFilters: DomainFilter[] = ["all", "web", "ai", "tools", "academic", "games"];
const langFilters: LangFilter[] = ["all", "typescript", "python", "rust", "cpp", "javascript"];

// =============================================

export default function ProjectsPage() {
  const { t, locale } = useTranslation();
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("all");
  const [activeLang, setActiveLang] = useState<LangFilter>("all");

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const domainMatch = activeDomain === "all" || p.domain === activeDomain;
      const langMatch = activeLang === "all" || p.lang === activeLang;
      return domainMatch && langMatch;
    });
  }, [activeDomain, activeLang]);

  // Stats dynamiques
  const totalProjects = projectsList.length;
  const totalTechs = [...new Set(projectsList.flatMap((p) => p.techs))].length;
  const totalDomains = [...new Set(projectsList.map((p) => p.domain))].length;

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* ── Hero immersif ── */}
        <section className="pp-hero">
          {/* Particules décoratives */}
          <div className="pp-hero-orb pp-orb-1" />
          <div className="pp-hero-orb pp-orb-2" />
          <div className="pp-hero-orb pp-orb-3" />

          <div className="pp-hero-container">
            <span className="eyebrow">
              {t("projectsPage.eyebrow" as TranslationKey)}
            </span>
            <h1 className="pp-hero-title">
              {t("projectsPage.title" as TranslationKey)}{" "}
              <span className="pp-hero-highlight">
                {t("projectsPage.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="pp-hero-intro">
              {t("projectsPage.intro" as TranslationKey)}
            </p>

            {/* Mini stats */}
            <div className="pp-stats-row">
              <div className="pp-stat">
                <span className="pp-stat-value">{totalProjects}</span>
                <span className="pp-stat-label">
                  {t("projectsPage.stats.projects" as TranslationKey)}
                </span>
              </div>
              <div className="pp-stat-divider" />
              <div className="pp-stat">
                <span className="pp-stat-value">{totalTechs}</span>
                <span className="pp-stat-label">
                  {t("projectsPage.stats.techs" as TranslationKey)}
                </span>
              </div>
              <div className="pp-stat-divider" />
              <div className="pp-stat">
                <span className="pp-stat-value">{totalDomains}</span>
                <span className="pp-stat-label">
                  {t("projectsPage.stats.domains" as TranslationKey)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Barre de filtres sticky ── */}
        <div className="pp-filter-bar">
          <div className="pp-filter-bar-inner">

            {/* Filtre par domaine */}
            <div className="pp-filter-group">
              <span className="pp-filter-label">
                <Layers size={14} />
                {t("projectsPage.domainLabel" as TranslationKey)}
              </span>
              <div className="pp-filter-chips">
                {domainFilters.map((d) => (
                  <button
                    key={d}
                    className={`pp-chip ${activeDomain === d ? "pp-chip--active" : ""}`}
                    onClick={() => setActiveDomain(d)}
                  >
                    {t(`projectsPage.filter.${d}` as TranslationKey)}
                    {activeDomain === d && d !== "all" && (
                      <span className="pp-chip-count">
                        {projectsList.filter((p) => p.domain === d).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtre par langage */}
            <div className="pp-filter-group">
              <span className="pp-filter-label">
                <Code2 size={14} />
                {t("projectsPage.langLabel" as TranslationKey)}
              </span>
              <div className="pp-filter-chips">
                {langFilters.map((l) => (
                  <button
                    key={l}
                    className={`pp-chip pp-chip--lang ${activeLang === l ? "pp-chip--active" : ""}`}
                    onClick={() => setActiveLang(l)}
                  >
                    {t(`projectsPage.langFilter.${l}` as TranslationKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Grille de projets — Layout Bento ── */}
        <div className="pp-bento">
          {filteredProjects.length === 0 ? (
            <div className="pp-no-results">
              <p>{t("projectsPage.noResults" as TranslationKey)}</p>
            </div>
          ) : (
            filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`pp-card ${project.featured ? "pp-card--featured" : ""}`}
                style={{
                  animationDelay: `${0.05 + idx * 0.07}s`,
                  "--card-accent": project.color,
                } as React.CSSProperties}
              >
                {/* Image */}
                <div className="pp-card-image">
                  <img
                    src={project.image}
                    alt={locale === "fr" ? project.titleFr : project.titleEn}
                    className="pp-card-img"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).classList.add("pp-card-image--fallback");
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="pp-card-image-label">
                    {(locale === "fr" ? project.titleFr : project.titleEn).charAt(0)}
                  </span>
                </div>

                {/* Top accent line */}
                <div className="pp-card-accent-line" />

                {/* Header */}
                <div className="pp-card-header">
                  <div className="pp-card-domain-badge">
                    {t(`projectsPage.filter.${project.domain}` as TranslationKey)}
                  </div>
                  <span className="pp-card-year">{project.year}</span>
                  {project.featured && (
                    <span className="pp-card-featured-badge">
                      <Sparkles size={12} />
                      {t("projectsPage.featured" as TranslationKey)}
                    </span>
                  )}
                </div>

                {/* Title + Desc */}
                <h2 className="pp-card-title">
                  {locale === "fr" ? project.titleFr : project.titleEn}
                </h2>
                <p className="pp-card-desc">
                  {locale === "fr" ? project.descFr : project.descEn}
                </p>

                {/* Spacer */}
                <div className="pp-card-spacer" />

                {/* Tech stack */}
                <div className="pp-card-techs">
                  {project.techs.map((tech) => (
                    <span key={tech} className="pp-tech">{tech}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pp-card-actions">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-action pp-action--code"
                    >
                      <Github size={16} />
                      <span>{t("projects.viewCode" as TranslationKey)}</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-action pp-action--demo"
                    >
                      <ExternalLink size={16} />
                      <span>{t("projects.viewDemo" as TranslationKey)}</span>
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
