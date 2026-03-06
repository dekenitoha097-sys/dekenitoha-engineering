"use client";

import "./Projects.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { ArrowRight, ExternalLink, Github, Download } from "lucide-react";

// =============================================
// 📋 DONNÉES PROJETS — Modifie / ajoute ici !
// =============================================
const projectsList = [
  {
    id: "portfolio",
    titleFr: "Portfolio Personnel",
    titleEn: "Personal Portfolio",
    descFr: "Site portfolio moderne avec Next.js, design glassmorphism, bilingue FR/EN, génération PDF du CV.",
    descEn: "Modern portfolio website with Next.js, glassmorphism design, bilingual FR/EN, CV PDF generation.",
    category: "web",
    techs: ["Next.js", "TypeScript", "CSS", "html2pdf.js"],
    image: "/projects/portfolio.png",
    github: "https://github.com/dekenimawuli/portfolio",
    demo: "",
    featured: true,
  },
  {
    id: "ai-classifier",
    titleFr: "Classificateur d'Images IA",
    titleEn: "AI Image Classifier",
    descFr: "Outil de classification d'images utilisant TensorFlow, avec interface web React et visualisation des résultats.",
    descEn: "Image classification tool using TensorFlow, with React web interface and result visualization.",
    category: "ai",
    techs: ["Python", "TensorFlow", "React", "Tailwind CSS"],
    image: "/projects/ai-classifier.png",
    github: "https://github.com/dekenimawuli/ai-classifier",
    demo: "",
    featured: true,
  },
  {
    id: "task-manager",
    titleFr: "Gestionnaire de Tâches",
    titleEn: "Task Manager",
    descFr: "Application full stack de gestion de tâches avec authentification, CRUD complet et interface responsive.",
    descEn: "Full stack task management app with authentication, complete CRUD and responsive interface.",
    category: "web",
    techs: ["React", "Node.js", "PostgreSQL", "Prisma"],
    image: "/projects/task-manager.png",
    github: "https://github.com/dekenimawuli/task-manager",
    demo: "",
    featured: true,
  },
  {
    id: "cli-tool",
    titleFr: "Outil CLI en Rust",
    titleEn: "Rust CLI Tool",
    descFr: "Outil en ligne de commande pour automatiser des tâches de développement, écrit en Rust.",
    descEn: "Command-line tool for automating development tasks, written in Rust.",
    category: "tools",
    techs: ["Rust", "CLI"],
    image: "/projects/cli-tool.png",
    github: "https://github.com/dekenimawuli/cli-tool",
    demo: "",
    featured: false,
  },
  {
    id: "data-analysis",
    titleFr: "Analyse de Données Académique",
    titleEn: "Academic Data Analysis",
    descFr: "Projet universitaire d'analyse de données avec Python, pandas et visualisations matplotlib.",
    descEn: "University data analysis project with Python, pandas and matplotlib visualizations.",
    category: "academic",
    techs: ["Python", "Pandas", "Matplotlib"],
    image: "/projects/data-analysis.png",
    github: "https://github.com/dekenimawuli/data-analysis",
    demo: "",
    featured: false,
  },
  {
    id: "chat-app",
    titleFr: "Application de Chat en Temps Réel",
    titleEn: "Real-Time Chat App",
    descFr: "Chat en temps réel avec WebSocket, Node.js et interface React moderne.",
    descEn: "Real-time chat with WebSocket, Node.js and modern React interface.",
    category: "web",
    techs: ["React", "Node.js", "WebSocket", "CSS"],
    image: "/projects/chat-app.png",
    github: "https://github.com/dekenimawuli/chat-app",
    demo: "",
    featured: false,
  },
  {
    id: "memory_game",
    titleFr: "Jeu de memoire",
    titleEn: "Memory Game",
    descFr: "Jeu de memoire developpe en Python avec un systeme de score sauvegarde dans une base de donnees SQLite3. Le joueur peut choisir entre plusieurs tailles de grille allant de 4x4 a 6x6.",
    descEn: "Memory game developed in Python with a score system stored in a SQLite3 database. Players can choose between multiple grid sizes ranging from 4x4 to 6x6.",
    category: "games",
    techs: ["Python", "SQLite3"],
    image: "/projects/memory-game.png",
    github: "https://github.com/dekenitoha097-sys/memory_game.git",
    demo: "",
    download: "/downloads/memory-game.zip",
    featured: true,
  },
  {
    id: "breakout_game",
    titleFr: "Jeu Breakout",
    titleEn: "Breakout Game",
    descFr: "Jeu Breakout developpe en C++ avec la bibliotheque Raylib. Il comprend 30 niveaux, un menu principal, un systeme de parametres, la gestion du son et plusieurs niveaux de difficulte.",
    descEn: "Breakout game developed in C++ using the Raylib library. It features 30 levels, a main menu, settings, sound management, and multiple difficulty levels.",
    category: "games",
    techs: ["C++", "Raylib", "nlohmann/json"],
    image: "/projects/breakout-game.png",
    github: "https://github.com/dekenitoha097-sys/breakout-game.git",
    demo: "",
    download: "/downloads/breakout-game.zip",
    featured: true,
  },
];

// Nombre de projets affichés sur la homepage
const HOMEPAGE_COUNT = 3;

export default function Projects() {
  const { t, locale } = useTranslation();
  const featured = projectsList.filter((p) => p.featured).slice(0, HOMEPAGE_COUNT);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="projects-bg-glow proj-glow-1" />
      <div className="projects-bg-glow proj-glow-2" />

      <div className="projects-container">
        <header className="projects-header">
          <span className="eyebrow">
            {t("projects.eyebrow" as TranslationKey)}
          </span>
          <h2 id="projects-heading" className="projects-title">
            {t("projects.title" as TranslationKey)}{" "}
            <span className="projects-title-highlight">
              {t("projects.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="projects-description">
            {t("projects.description" as TranslationKey)}
          </p>
        </header>

        <div className="projects-grid">
          {featured.map((project, i) => (
            <article
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="project-card-image">
                <img
                  src={project.image}
                  alt={locale === "fr" ? project.titleFr : project.titleEn}
                  className="project-card-img"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).classList.add("project-card-image--fallback");
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="project-card-image-label">
                  {project.id.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">
                  {locale === "fr" ? project.titleFr : project.titleEn}
                </h3>
                <p className="project-card-desc">
                  {locale === "fr" ? project.descFr : project.descEn}
                </p>
                <div className="project-card-techs">
                  {project.techs.map((tech) => (
                    <span key={tech} className="project-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-card-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={15} />
                      {t("projects.viewCode" as TranslationKey)}
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link project-link--demo">
                      <ExternalLink size={15} />
                      {t("projects.viewDemo" as TranslationKey)}
                    </a>
                  )}
                  {project.category === "games" && project.download && (
                    <a href={project.download} className="project-link project-link--download" download>
                      <Download size={15} />
                      {t("projects.downloadGame" as TranslationKey)}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-cta-wrapper">
          <Link href="/projects" className="btn btn-ghost projects-cta">
            {t("projects.seeMore" as TranslationKey)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Export pour la page aussi
export { projectsList };
