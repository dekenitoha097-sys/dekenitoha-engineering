"use client";

import "./Projects.css";
import "./ProjectModal.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { ArrowRight, ExternalLink, Github, Download, Eye } from "lucide-react";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { trackProjectView, trackProjectGithub, trackProjectDemo } from "@/lib/analytics";

// =============================================
// 📋 DONNÉES PROJETS — Modifie / ajoute ici !
// =============================================
const projectsList = [
  {
    id: "breakout_game",
    titleFr: "Jeu Breakout",
    titleEn: "Breakout Game",
    descFr: "Jeu Breakout developpe en C++ avec la bibliotheque Raylib. Il comprend 30 niveaux, un menu principal, un systeme de parametres, la gestion du son et plusieurs niveaux de difficulte.",
    descEn: "Breakout game developed in C++ using the Raylib library. It features 30 levels, a main menu, settings, sound management, and multiple difficulty levels.",
    category: "games",
    techs: ["C++", "Raylib", "nlohmann/json"],
    images: ["/projects/breakout-game0.png","/projects/breakout-game.png","/projects/breakout-game1.png"],
    github: "https://github.com/dekenitoha097-sys/breakout-game.git",
    demo: "",
    download: "/downloads/breakout_game_Windows.zip",
    featured: true,
    featuresFr: ["30 niveaux", "Menu principal", "Gestion du son", "3 difficultés"],
    featuresEn: ["30 levels", "Main menu", "Sound management", "3 difficulties"]
  },
  {
    id: "e-commerce",
    titleFr: "Plateforme E-Commerce Full Stack",
    titleEn: "Full Stack E-Commerce Platform",
    descFr: "Application e-commerce moderne avec Next.js, paiement sécurisé, gestion des produits, panier interactif.",
    descEn: "Modern e-commerce application with Next.js, secure payment, product management, interactive cart.",
    category: "web",
    techs: ["Next.js", "TypeScript", "Tailwind"],
    images: ["ecommerce.png","ecommerce1.png"],
    github: "https://github.com/dekenitoha097-sys/store",
    demo: "https://store-peach-ten-85.vercel.app/",
    featured: true,
    featuresFr: ["Stripe paiement", "Gestion produits", "Panier interactif", "Auth NextAuth"],
    featuresEn: ["Stripe payment", "Product management", "Interactive cart", "NextAuth"]
  },
  {
    id: "quizhub",
    titleFr: "QuizHub – Application Interactive",
    titleEn: "QuizHub – Interactive Application",
    descFr: "Application web interactive avec quiz dynamiques, sauvegarde des scores Firebase.",
    descEn: "Interactive web application with dynamic quizzes, Firebase score saving.",
    category: "web",
    techs: ["React", "TypeScript", "Node.js", "Express"],
    images:  ["/projects/quiz_app.png","/projects/quiz_app1.png","/projects/quiz_app2.png"],
    github: "https://github.com/dekenitoha097-sys/quizhub",
    demo: "https://quizhub-kappa.vercel.app/quiz",
    featured: true,
    featuresFr: ["Quiz dynamiques", "Scores temps réel", "Auth Firebase", "Classements"],
    featuresEn: ["Dynamic quizzes", "Real-time scores", "Firebase Auth", "Leaderboards"]
  },
  {
    id: "dashboard-analytics",
    titleFr: "Dashboard Analytics Professionnel",
    titleEn: "Professional Analytics Dashboard",
    descFr: "Tableau de bord analytique avec visualisation avancée des données, graphiques interactifs et mise à jour en temps réel. Conçu pour fournir des insights clairs grâce à une architecture front-end performante et une gestion efficace des flux de données côté serveur.",
    descEn: "Analytics dashboard with advanced data visualization, interactive charts and real-time updates. Designed to provide clear insights thanks to a performant front-end architecture and effective server-side data flow management.",
    category: "web",
    techs: ["React", "D3.js", "Node.js"],
    images: ["d1.png", "d2.png", "d3.png"],
    github: "https://github.com/dekenitoha097-sys/deke.dashboard.com",
    demo: "https://deke-dashboard-com.vercel.app/",
    featured: true,
    featuresFr: ["Visualisation D3.js", "Graphiques interactifs", "Données temps réel", "Dashboards personnalisables"],
    featuresEn: ["D3.js visualization", "Interactive charts", "Real-time data", "Customizable dashboards"]
  },
   {
    id: "portfolio",
    titleFr: "Portfolio Personnel",
    titleEn: "Personal Portfolio",
    descFr: "Site portfolio moderne avec Next.js, design glassmorphism, bilingue FR/EN, génération PDF du CV.",
    descEn: "Modern portfolio website with Next.js, glassmorphism design, bilingual FR/EN, CV PDF generation.",
    category: "web",
    techs: ["Next.js", "TypeScript", "CSS", "html2pdf.js"],
    images: ["portfolio.png"],
    github: "https://github.com/dekenimawuli/portfolio",
    demo: "",
    featured: true,
    featuresFr: ["Design glassmorphism", "i18n FR/EN", "PDF CV", "Responsive"],
    featuresEn: ["Glassmorphism design", "FR/EN i18n", "CV PDF", "Responsive"]
  },
  {
    id: "memory_game",
    titleFr: "Jeu de memoire",
    titleEn: "Memory Game",
    descFr: "Jeu de memoire developpe en Python avec un systeme de score sauvegarde dans une base de donnees SQLite3. Le joueur peut choisir entre plusieurs tailles de grille allant de 4x4 a 6x6.",
    descEn: "Memory game developed in Python with a score system stored in a SQLite3 database. Players can choose between multiple grid sizes ranging from 4x4 to 6x6.",
    category: "games",
    techs: ["Python", "SQLite3"],
    images: ["memory-game.png"],
    github: "https://github.com/dekenitoha097-sys/memory_game.git",
    demo: "",
    download: "/downloads/MemoryGamePro_Windows.zip",
    featured: true,
    featuresFr: ["Grilles 4x4 à 6x6", "Scores SQLite3", "Classements", "Animations"],
    featuresEn: ["Grids 4x4 to 6x6", "SQLite3 scores", "Leaderboards", "Animations"]
  },
  
  {
    id: "moni-c",
    titleFr: "Moni-C — Moniteur système Linux",
    titleEn: "Moni-C — Linux System Monitor",
    descFr: "Mini-moniteur système développé en C et C++ pour suivre en temps réel l'état d'un système Linux. Le projet affiche l'utilisation du CPU, de la RAM, le Load Average, l'Uptime ainsi que la mémoire Swap.",
    descEn: "Mini system monitor developed in C and C++ to track the real-time status of a Linux system. The project displays CPU and RAM usage, Load Average, system uptime, and swap memory.",
    category: "tools",
    techs: ["C", "C++", "JSON", "HTML", "CSS", "JavaScript", "httplib"],
    images: ["monic.png"],
    github: "https://github.com/dekenitoha097-sys/monic.git",
    demo: "",
    featured: true,
    featuresFr: ["Monitoring CPU/RAM", "Load Average", "Uptime", "Interface web"],
    featuresEn: ["CPU/RAM monitoring", "Load Average", "Uptime", "Web interface"]
  },
];

// Nombre de projets affichés sur la homepage
const HOMEPAGE_COUNT = 3;

export default function Projects() {
  const { t, locale } = useTranslation();
  const featured = projectsList.filter((p) => p.featured).slice(0, HOMEPAGE_COUNT);
  const [selectedProject, setSelectedProject] = useState<typeof projectsList[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});

  const openModal = (project: typeof projectsList[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getProjectImages = (project: { images: string[] }): string[] => {
    // Add /projects/ prefix if not present
    return project.images.map(img => img.startsWith('/projects/') ? img : `/projects/${img}`);
  };

  const getCurrentImageIndex = (projectId: string): number => {
    return currentImageIndices[projectId] || 0;
  };

  const goToPrevImage = (project: typeof projectsList[0]) => {
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(project.id);
    setCurrentImageIndices(prev => ({ 
      ...prev, 
      [project.id]: currentIndex === 0 ? images.length - 1 : currentIndex - 1 
    }));
  };

  const goToNextImage = (project: typeof projectsList[0]) => {
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(project.id);
    setCurrentImageIndices(prev => ({ 
      ...prev, 
      [project.id]: currentIndex === images.length - 1 ? 0 : currentIndex + 1 
    }));
  };

  return (
    <>
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
                  {(() => {
                    const images = getProjectImages(project);
                    const currentIndex = getCurrentImageIndex(project.id);
                    const hasMultipleImages = images.length > 1;
                    
                    return (
                      <>
                        <img
                          src={images[currentIndex]}
                          alt={`${locale === "fr" ? project.titleFr : project.titleEn} - Image ${currentIndex + 1}`}
                          className="project-card-img"
                          onError={(e) => {
                            (e.currentTarget.parentElement as HTMLElement).classList.add("project-card-image--fallback");
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {hasMultipleImages && (
                          <>
                            <button 
                              className="project-card-image-nav project-card-image-nav--prev" 
                              onClick={(e) => { e.stopPropagation(); goToPrevImage(project); }}
                            >
                              ‹
                            </button>
                            <button 
                              className="project-card-image-nav project-card-image-nav--next" 
                              onClick={(e) => { e.stopPropagation(); goToNextImage(project); }}
                            >
                              ›
                            </button>
                            <div className="project-card-image-dots">
                              {images.map((_, idx) => (
                                <span 
                                  key={idx} 
                                  className={`project-card-image-dot ${idx === currentIndex ? 'project-card-image-dot--active' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndices(prev => ({ ...prev, [project.id]: idx })); }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        <span className="project-card-image-label">
                          {project.id.charAt(0).toUpperCase()}
                        </span>
                      </>
                    );
                  })()}
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">
                    {locale === "fr" ? project.titleFr : project.titleEn}
                  </h3>
                  <p className="project-card-desc">
                    {locale === "fr" ? project.descFr : project.descEn}
                  </p>
                  <div className="project-card-techs">
                    {project.techs.slice(0, 4).map((tech) => (
                      <span key={tech} className="project-tag">{tech}</span>
                    ))}
                    {project.techs.length > 4 && (
                      <span className="project-tag">+{project.techs.length - 4}</span>
                    )}
                  </div>
                  <div className="project-card-links">
                    <button 
                      className="project-link project-link--details"
                      onClick={() => {
                        openModal(project);
                        trackProjectView(project.id, project.titleFr || project.titleEn);
                      }}
                    >
                      <Eye size={15} />
                      {t("projects.viewDetails" as TranslationKey)}
                    </button>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        onClick={() => trackProjectGithub(project.id, project.titleFr || project.titleEn)}
                      >
                        <Github size={15} />
                        {t("projects.viewCode" as TranslationKey)}
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link project-link--demo"
                        onClick={() => trackProjectDemo(project.id, project.titleFr || project.titleEn)}
                      >
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

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        locale={locale as "fr" | "en"}
      />
    </>
  );
}

// Export pour la page aussi
export { projectsList };
