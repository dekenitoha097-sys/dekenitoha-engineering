"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Github, ExternalLink, Layers, Code2, Sparkles, Download, Eye } from "lucide-react";
import { trackProjectView, trackProjectGithub, trackProjectDemo } from "@/lib/analytics";
import ProjectModal from "@/components/ProjectModal";
import "@/components/ProjectModal.css";
import "./projects-page.css";

// =============================================
// ðŸ“‹ DONNÃ‰ES PROJETS â€” Modifie / ajoute ici !
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
  download?: string;
  featured: boolean;
  year: number;
  color: string; // gradient accent pour chaque projet
  images: string[]; // tableau d'images du projet (dans /public)
  featuresFr?: string[];
  featuresEn?: string[];
  resultsFr?: string[];
  resultsEn?: string[];
}

// ðŸŽ¨ Couleurs par domaine
const domainColors: Record<string, string> = {
  web: "from-blue-accent",
  ai: "from-purple-accent",
  tools: "from-orange-accent",
  academic: "from-green-accent",
  games: "from-pink-accent",
};

// Liste des projets â€” AJOUTE DES OBJETS ICI POUR AJOUTER DES PROJETS
const projectsList: Project[] = [
  {
    id: "portfolio",
    titleFr: "Portfolio Personnel",
    titleEn: "Personal Portfolio",
    descFr:
      "Site portfolio next-gen avec Next.js, design glassmorphism, bilingue FR/EN, systéme i18n custom, génération PDF du CV, styles d'impression premium.",
    descEn:
      "Next-gen portfolio site with Next.js, glassmorphism design, bilingual FR/EN, custom i18n system, CV PDF generation, premium print styles.",
    domain: "web",
    lang: "typescript",
    techs: ["Next.js", "TypeScript", "CSS", "html2pdf.js"],
    github: "https://github.com/dekenitoha097-sys/dekenitoha-engineering.git",
    demo: "",
    featured: true,
    year: 2025,
    color: "#0070f3",
    images: ["/projects/portfolio.png"],
    featuresFr: [
      "Design glassmorphism moderne avec animations fluides",
      "Système i18n bilingual FR/EN complet",
      "Génération PDF du CV avec styles d'impression",
      "Architecture Next.js avec Server Components",
      "Responsive design optimisé pour tous les écrans"
    ],
    featuresEn: [
      "Modern glassmorphism design with smooth animations",
      "Complete bilingual FR/EN i18n system",
      "CV PDF generation with print styles",
      "Next.js architecture with Server Components",
      "Responsive design optimized for all screens"
    ],
    resultsFr: ["Site performant et rapide", "Expérience utilisateur fluide", "Génération PDF fonctionnelle"],
    resultsEn: ["Fast and performant website", "Smooth user experience", "Working PDF generation"]
  },
  {
    id: "e-commerce",
    titleFr: "Plateforme E-Commerce Full Stack",
    titleEn: "Full Stack E-Commerce Platform",
    descFr:
      "Application e-commerce moderne développée avec Next.js, intégrant un système de paiement sécurisé, une gestion dynamique des produits, un panier interactif et une expérience utilisateur optimisée. Architecture performante avec rendu hybride (SSR/CSR) et interface responsive.",
    descEn:
      "Modern e-commerce application developed with Next.js, featuring secure payment system, dynamic product management, interactive cart and optimized user experience. Performant architecture with hybrid rendering (SSR/CSR) and responsive interface.",
    domain: "web",
    lang: "typescript",
    techs: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/dekenitoha097-sys/store",
    demo: "https://store-peach-ten-85.vercel.app/",
    featured: true,
    year: 2025,
    color: "#0070f3",
    images: ["/projects/ecommerce.png"],
    featuresFr: [
      "Système de paiement sécurisé Stripe intégré",
      "Gestion dynamique des produits avec inventaire",
      "Panier interactif avec sauvegarde locale",
      "Authentication utilisateurs avec NextAuth",
      "Interface responsive mobile-first"
    ],
    featuresEn: [
      "Secure Stripe payment system integration",
      "Dynamic product management with inventory",
      "Interactive cart with local storage",
      "User authentication with NextAuth",
      "Mobile-first responsive interface"
    ],
    resultsFr: ["Paiement fonctionnel", "Gestion produits complète", "Interface responsive"],
    resultsEn: ["Working payment system", "Complete product management", "Responsive interface"]
  },
  {
    id: "quizhub",
    titleFr: "QuizHub – Application Interactive",
    titleEn: "QuizHub – Interactive Application",
    descFr:
      "Application web interactive permettant aux utilisateurs de répondre à des quiz dynamiques avec sauvegarde des scores en temps réel. Intégration Firebase pour l'authentification et la gestion des données, interface moderne et expérience fluide optimisée pour mobile et desktop.",
    descEn:
      "Interactive web application allowing users to answer dynamic quizzes with real-time score saving. Firebase integration for authentication and data management, modern interface and fluid experience optimized for mobile and desktop.",
    domain: "web",
    lang: "typescript",
    techs: ["React", "Firebase", "Expo"],
    github: "https://github.com/dekenitoha097-sys/quizhub",
    demo: "https://quizhub-kappa.vercel.app/quiz",
    featured: true,
    year: 2025,
    color: "#0070f3",
    images: ["/projects/quiz_app.png","/projects/quiz_app1.png","/projects/quiz_app2.png"],
    featuresFr: [
      "Quiz dynamiques avec questions variées",
      "Sauvegarde des scores en temps réel Firebase",
      "Authentication Firebase (Google, Email)",
      "Classements et statistiques joueurs",
      "Design responsive mobile et desktop"
    ],
    featuresEn: [
      "Dynamic quizzes with varied questions",
      "Real-time score saving with Firebase",
      "Firebase authentication (Google, Email)",
      "Player rankings and statistics",
      "Responsive design for mobile and desktop"
    ],
    resultsFr: ["Application fonctionnelle", "Classements en temps réel", "Authentification working"],
    resultsEn: ["Working application", "Real-time leaderboards", "Working authentication"]
  },
  {
    id: "dashboard-analytics",
    titleFr: "Dashboard Analytics Professionnel",
    titleEn: "Professional Analytics Dashboard",
    descFr:
      "Tableau de bord analytique avec visualisation avancée des données, graphiques interactifs et mise à jour en temps réel. Conçu pour fournir des insights clairs grâce à une architecture front-end performante et une gestion efficace des flux de données côté serveur.",
    descEn:
      "Analytics dashboard with advanced data visualization, interactive charts and real-time updates. Designed to provide clear insights thanks to a performant front-end architecture and effective server-side data flow management.",
    domain: "web",
    lang: "typescript",
    techs: ["React", "D3.js", "Node.js"],
    github: "https://github.com/dekenitoha097-sys/deke.dashboard.com",
    demo: "https://deke-dashboard-com.vercel.app/",
    featured: true,
    year: 2025,
    color: "#0070f3",
    images: ["/projects/dashboard.png"],
    featuresFr: [
      "Visualisation de données avancées avec D3.js",
      "Graphiques interactifs et dynamiques",
      "Mise à jour des données en temps réel",
      "Tableaux de bord personnalisables",
      "Export des données (CSV, PDF)"
    ],
    featuresEn: [
      "Advanced data visualization with D3.js",
      "Interactive and dynamic charts",
      "Real-time data updates",
      "Customizable dashboards",
      "Data export (CSV, PDF)"
    ],
    resultsFr: ["Visualisations fonctionnelles", "Graphiques interactifs", "Export de données"],
    resultsEn: ["Working visualizations", "Interactive charts", "Data export"]
  },
    {
    id: "memory_game",
    titleFr: "Jeu de memoire",
    titleEn: "Memory Game",
    descFr:
      "Jeu de memoire developpe en Python avec un systeme de score sauvegarde dans une base de donnees SQLite3. Le joueur peut choisir entre plusieurs tailles de grille allant de 4x4 a 6x6.",
    descEn:
      "Memory game developed in Python with a score system stored in a SQLite3 database. Players can choose between multiple grid sizes ranging from 4x4 to 6x6.",
    domain: "games",
    lang: "python",
    techs: ["Python", "SQLite3"],
    github: "https://github.com/dekenitoha097-sys/memory_game.git",
    demo: "",
    download: "/downloads/MemoryGamePro_Windows.zip",
    featured: true,
    year: 2025,
    color: "#ec4899",
    images: ["/projects/memory-game.png"],
    featuresFr: [
      "Jeu de mémoire avec Plusieurs tailles de grille (4x4 à 6x6)",
      "Système de score sauvegardé en SQLite3",
      "Classement des meilleurs scores",
      "Animations et effets visuels",
      "Interface utilisateur intuitive"
    ],
    featuresEn: [
      "Memory game with multiple grid sizes (4x4 to 6x6)",
      "Score system saved in SQLite3",
      "High score leaderboard",
      "Animations and visual effects",
      "Intuitive user interface"
    ],
    resultsFr: ["Jeu fonctionnel", "Sauvegarde des scores", "Classements disponibles"],
    resultsEn: ["Working game", "Score saving", "Leaderboards available"]
  },
    {
    id: "breakout_game",
    titleFr: "Jeu Breakout",
    titleEn: "Breakout Game",
    descFr:
      "Jeu Breakout developpe en C++ avec la bibliotheque Raylib. Il comprend 30 niveaux, un menu principal, un systeme de parametres, la gestion du son et plusieurs niveaux de difficulte.",
    descEn:
      "Breakout game developed in C++ using the Raylib library. It features 30 levels, a main menu, settings, sound management, and multiple difficulty levels.",
    domain: "games",
    lang: "cpp",
    techs: ["C++", "Raylib", "nlohmann/json"],
    github: "https://github.com/dekenitoha097-sys/breakout-game.git",
    demo: "",
    download: "/downloads/breakout_game_Windows.zip",
    featured: true,
    year: 2025,
    color: "#f472b6",
    images: ["/projects/breakout-game0.png","/projects/breakout-game.png","/projects/breakout-game1.png"],
    featuresFr: [
      "30 niveaux de jeu progressifs",
      "Menu principal et système de paramètres",
      "Gestion du son (musique et effets)",
      "Trois niveaux de difficulté",
      "Contrôles clavier fluides"
    ],
    featuresEn: [
      "30 progressive game levels",
      "Main menu and settings system",
      "Sound management (music and effects)",
      "Three difficulty levels",
      "Smooth keyboard controls"
    ],
    resultsFr: ["30 niveaux jouables", "Jeu complet avec son", "3 difficultés"],
    resultsEn: ["30 playable levels", "Complete game with sound", "3 difficulties"]
  },
  {
    id: "moni-c",
    titleFr: "Moni-C — Moniteur système Linux",
    titleEn: "Moni-C — Linux System Monitor",
    descFr:
      "Mini-moniteur système développé en C et C++ pour suivre en temps réel l'état d'un système Linux. Le projet affiche l'utilisation du CPU, de la RAM, le Load Average, l'Uptime ainsi que la mémoire Swap. Il propose deux modes d'affichage : console dans le terminal et interface web dynamique via HTML, CSS et JavaScript.",
    descEn:
      "Mini system monitor developed in C and C++ to track the real-time status of a Linux system. The project displays CPU and RAM usage, Load Average, system uptime, and swap memory. It provides two display modes: console output in the terminal and a dynamic web interface using HTML, CSS, and JavaScript.",
    domain: "tools",
    lang: "cpp",
    techs: ["C", "C++", "JSON", "HTML", "CSS", "JavaScript", "httplib"],
    github: "https://github.com/dekenitoha097-sys/monic.git",
    demo: "",
    featured: true,
    year: 2026,
    color: "#22c55e",
    images: ["/projects/monic.png","/projects/monic1.png"],
    featuresFr: [
      "Monitoring CPU, RAM et Load Average",
      "Affichage de l'Uptime système",
      " Surveillance de la mémoire Swap",
      "Deux modes d'affichage: terminal et interface web",
      "Fréquence de rafraîchissement configurable"
    ],
    featuresEn: [
      "CPU, RAM and Load Average monitoring",
      "System Uptime display",
      "Swap memory usage monitoring",
      "Two display modes: terminal and web interface",
      "Configurable refresh rate"
    ],
    resultsFr: ["Monitoring système fonctionnel", "Deux modes d'affichage", "Données en temps réel"],
    resultsEn: ["Working system monitoring", "Two display modes", "Real-time data"]
  },
  {
  id: "iot-temp-sensor",
  titleFr: "Capteur Température & Humidité",
  titleEn: "Temperature & Humidity Sensor",
  descFr:
    "Projet scolaire IoT utilisant un capteur de température et d'humidité pour collecter les données en temps réel et les enregistrer dans une base de données. Les valeurs peuvent être visualisées via une interface simple ou exploitées pour des analyses ultérieures.",
  descEn:
    "IoT school project using a temperature and humidity sensor to collect real-time data and store it in a database. Values can be visualized via a simple interface or used for further analysis.",
  domain: "academic",
  lang: "python",
  techs: ["Python", "SQLite3", "ESP32", "DHT22"],
  github: "https://github.com/tohaDEKENI/esp32-weather-station-Projet-Fin-d-ann-e-.git",
  demo: "",
  featured: true,
  year: 2026,
  color: "#f59e0b",
  images: ["/projects/iot1.png","/projects/iot.png","/projects/iot2.png","/projects/iot3.png"],
  featuresFr: [
    "Collecte en temps réel des valeurs de température et d'humidité",
    "Stockage automatique dans une base de données SQLite3",
    "Utilisation d'un capteur DHT22 avec Raspberry Pi",
    "Visualisation simple des données via interface Python",
    "Possibilité d'export des données pour analyse"
  ],
  featuresEn: [
    "Real-time collection of temperature and humidity values",
    "Automatic storage in SQLite3 database",
    "Using DHT22 sensor with Raspberry Pi",
    "Simple data visualization via Python interface",
    "Option to export data for analysis"
  ],
  resultsFr: ["Données collectées en temps réel", "Stockage fiable dans la base", "Visualisation fonctionnelle"],
  resultsEn: ["Real-time data collection", "Reliable database storage", "Working data visualization"]
}
];

// Filtres disponibles
const domainFilters: DomainFilter[] = ["all", "web", "ai", "tools", "academic", "games"];
const langFilters: LangFilter[] = ["all", "typescript", "python", "rust", "cpp", "javascript"];

// =============================================

export default function ProjectsPage() {
  const { t, locale } = useTranslation();
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("all");
  const [activeLang, setActiveLang] = useState<LangFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const domainMatch = activeDomain === "all" || p.domain === activeDomain;
      const langMatch = activeLang === "all" || p.lang === activeLang;
      return domainMatch && langMatch;
    });
  }, [activeDomain, activeLang]);

  const openModal = (project: Project) => {
    // Track project view
    const title = project.titleFr || project.titleEn;
    trackProjectView(project.id, title);
    
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getProjectImages = (project: Project): string[] => {
    // Add /projects/ prefix if not present
    return project.images.map(img => img.startsWith('/projects/') ? img : `/projects/${img}`);
  };

  const getCurrentImageIndex = (projectId: string): number => {
    return currentImageIndices[projectId] || 0;
  };

  const setCurrentImageIndex = (projectId: string, index: number) => {
    setCurrentImageIndices(prev => ({ ...prev, [projectId]: index }));
  };

  const goToPrevImage = (project: Project) => {
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(project.id);
    setCurrentImageIndex(project.id, currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNextImage = (project: Project) => {
    const images = getProjectImages(project);
    const currentIndex = getCurrentImageIndex(project.id);
    setCurrentImageIndex(project.id, currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Stats dynamiques
  const totalProjects = projectsList.length;
  const totalTechs = [...new Set(projectsList.flatMap((p) => p.techs))].length;
  const totalDomains = [...new Set(projectsList.map((p) => p.domain))].length;

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* â”€â”€ Hero immersif â”€â”€ */}
        <section className="pp-hero">
          {/* Particules dÃ©coratives */}
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

        {/* â”€â”€ Barre de filtres sticky â”€â”€ */}
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

        {/* â”€â”€ Grille de projets â€” Layout Bento â”€â”€ */}
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
                {/* Image Gallery */}
                <div className="pp-card-image">
                  {(() => {
                    const images = getProjectImages(project);
                    const currentIndex = getCurrentImageIndex(project.id);
                    const hasMultipleImages = images.length > 1;
                    
                    return (
                      <>
                        <img
                          src={images[currentIndex]}
                          alt={`${locale === "fr" ? project.titleFr : project.titleEn} - Image ${currentIndex + 1}`}
                          className="pp-card-img"
                          onError={(e) => {
                            (e.currentTarget.parentElement as HTMLElement).classList.add("pp-card-image--fallback");
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {hasMultipleImages && (
                          <>
                            <button 
                              className="pp-card-image-nav pp-card-image-nav--prev" 
                              onClick={(e) => { e.stopPropagation(); goToPrevImage(project); }}
                            >
                              ‹
                            </button>
                            <button 
                              className="pp-card-image-nav pp-card-image-nav--next" 
                              onClick={(e) => { e.stopPropagation(); goToNextImage(project); }}
                            >
                              ›
                            </button>
                            <div className="pp-card-image-dots">
                              {images.map((_, idx) => (
                                <span 
                                  key={idx} 
                                  className={`pp-card-image-dot ${idx === currentIndex ? 'pp-card-image-dot--active' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(project.id, idx); }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        <span className="pp-card-image-label">
                          {(locale === "fr" ? project.titleFr : project.titleEn).charAt(0)}
                        </span>
                      </>
                    );
                  })()}
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
                  <button 
                    className="pp-action pp-action--details"
                    onClick={() => openModal(project)}
                  >
                    <Eye size={16} />
                    <span>{t("projects.viewDetails" as TranslationKey)}</span>
                  </button>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-action pp-action--code"
                      onClick={() => trackProjectGithub(project.id, project.titleFr || project.titleEn)}
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
                      onClick={() => trackProjectDemo(project.id, project.titleFr || project.titleEn)}
                    >
                      <ExternalLink size={16} />
                      <span>{t("projects.viewDemo" as TranslationKey)}</span>
                    </a>
                  )}
                  {project.domain === "games" && project.download && (
                    <a
                      href={project.download}
                      className="pp-action pp-action--download"
                      download
                    >
                      <Download size={16} />
                      <span>{t("projects.downloadGame" as TranslationKey)}</span>
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        locale={locale as "fr" | "en"}
      />
    </main>
  );
}

