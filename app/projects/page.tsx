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
    demo: "https://dekeni.dev",
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
    images: ["/projects/quiz_app.png"],
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
    images: ["/projects/portfolio.png"],
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
    id: "academic-platform",
    titleFr: "Plateforme de Gestion Académique Multi-Rôles",
    titleEn: "Multi-Role Academic Management Platform",
    descFr:
      "Je conçois et maintenu une plateforme académique complète avec trois espaces (admin, professeur, étudiant). Le backend Laravel expose une API sécurisée (Sanctum, policies, rôles), gère la logique métier (inscriptions automatiques, validation des notes, génération de bulletins) et s'appuie sur un service de cache centralisé. Le frontend Next.js fournit une interface moderne avec filtres avancés, modals métier cohérents, calendriers de cours/évaluations et parcours d'onboarding selon l'état des données académiques.",
    descEn:
      "I design and maintain a complete academic platform with three spaces (admin, professor, student). The Laravel backend exposes a secure API (Sanctum, policies, roles), handles business logic (automatic enrollments, grade validation, report generation) and relies on a centralized cache service. The Next.js frontend provides a modern interface with advanced filters, consistent business modals, course/evaluation calendars and onboarding paths based on academic data status.",
    domain: "web",
    lang: "typescript",
    techs: ["Laravel", "Next.js", "MySQL", "Sanctum", "Tailwind CSS", "Redis", "Docker"],
    github: "https://github.com/dekenitoha097-sys/academic-platform",
    demo: "",
    featured: true,
    year: 2026,
    color: "#0070f3",
    images: ["/projects/academic-platform.png", "/projects/academic-2.png", "/projects/academic-3.png"],
    featuresFr: [
      "Gestion complète du cycle académique: années, semestres, filières, niveaux et cours",
      "Espaces dédiés Admin / Professeur / Étudiant avec permissions par rôle",
      "Workflow réel des notes: brouillon, soumission professeur, validation admin, recalcul académique",
      "Calendriers intelligents pour l'emploi du temps et les évaluations",
      "Alertes métier et onboarding guidé selon les prérequis de configuration",
      "Optimisation des performances via mise en cache ciblée et invalidation contrôlée"
    ],
    featuresEn: [
      "Complete academic cycle management: years, semesters, fields, levels and courses",
      "Dedicated Admin / Professor / Student spaces with role-based permissions",
      "Real grade workflow: draft, professor submission, admin validation, academic recalculation",
      "Smart calendars for schedules and assessments",
      "Business alerts and guided onboarding based on configuration prerequisites",
      "Performance optimization through targeted caching and controlled invalidation"
    ],
    resultsFr: [
      "Unification des opérations académiques sur un workflow unique multi-rôles",
      "Gestion en environnement de test de dizaines de cours et plus de 100 évaluations",
      "Réduction des incohérences grâce aux validations automatiques et filtres contextuels"
    ],
    resultsEn: [
      "Unification of academic operations on a unique multi-role workflow",
      "Test environment management of dozens of courses and over 100 assessments",
      "Reduced inconsistencies through automatic validations and contextual filters"
    ]
  },
  {
    id: "ai-classifier",
    titleFr: "Classificateur d'Images IA",
    titleEn: "AI Image Classifier",
    descFr:
      "Classification d'images par CNN avec TensorFlow. Interface React avec upload, visualisation des prédictions et métriques de confiance en temps reel.",
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
    images: ["/projects/ai-classifier.jpg"],
    featuresFr: [
      "Modèle CNN avec TensorFlow/Keras",
      "Interface React avec upload d'images",
      "Visualisation des prédictions en temps réel",
      "Métriques de confiance (accuracy, loss)",
      "Traitement par lots (batch processing)"
    ],
    featuresEn: [
      "CNN model with TensorFlow/Keras",
      "React interface with image upload",
      "Real-time prediction visualization",
      "Confidence metrics (accuracy, loss)",
      "Batch processing support"
    ],
    resultsFr: ["Modèle IA fonctionnel", "Précision de classification", "Interface responsive"],
    resultsEn: ["Working AI model", "Classification accuracy", "Responsive interface"]
  },
  {
    id: "task-manager",
    titleFr: "Gestionnaire de Taches Full Stack",
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
    images: ["/projects/task-manager.jpg"],
    featuresFr: [
      "Authentication complète (JWT)",
      "CRUD complet des tâches",
      "Catégorisation et priorisation",
      "Drag & drop interactif",
      "Interface responsive avec animations"
    ],
    featuresEn: [
      "Complete authentication (JWT)",
      "Full task CRUD",
      "Categorization and prioritization",
      "Interactive drag & drop",
      "Responsive interface with animations"
    ],
    resultsFr: ["Application fonctionnelle", "Gestion complète des tâches", "Interface fluide"],
    resultsEn: ["Working application", "Complete task management", "Smooth interface"]
  },
  {
    id: "cli-tool",
    titleFr: "Dev CLI â€” Automatisation Rust",
    titleEn: "Dev CLI â€” Rust Automation",
    descFr:
      "Outil CLI haute performance en Rust : scaffold de projets, gestion de fichiers, formatage de code, avec systÃ¨me de plugins extensible.",
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
    images: ["/projects/cli-tool.jpg"],
    featuresFr: [
      "Scaffold de projets automatisé",
      "Gestion de fichiers avancées",
      "Formatage de code (Rust, JS, TS)",
      "Système de plugins extensible",
      "Commandes personnalisables"
    ],
    featuresEn: [
      "Automated project scaffolding",
      "Advanced file management",
      "Code formatting (Rust, JS, TS)",
      "Extensible plugin system",
      "Customizable commands"
    ],
    resultsFr: ["Outil fonctionnel", "Automatisation du développement", "Gain de productivité"],
    resultsEn: ["Working tool", "Development automation", "Productivity gain"]
  },
  {
    id: "data-analysis",
    titleFr: "Analyse de DonnÃ©es Exploratoire",
    titleEn: "Exploratory Data Analysis",
    descFr:
      "Projet universitaire : nettoyage de donnÃ©es massif, statistiques descriptives, visualisations interactives avec matplotlib et pandas.",
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
    images: ["/projects/data-analysis.jpg"],
    featuresFr: [
      "Nettoyage de données massif avec Pandas",
      "Statistiques descriptives complètes",
      "Visualisations interactives Matplotlib",
      "Analyse de corrélation",
      "Rapports automatisés"
    ],
    featuresEn: [
      "Massive data cleaning with Pandas",
      "Complete descriptive statistics",
      "Interactive Matplotlib visualizations",
      "Correlation analysis",
      "Automated reports"
    ],
    resultsFr: ["Analyse complète des données", "Visualisations automatisées", "Rapports générés"],
    resultsEn: ["Complete data analysis", "Automated visualizations", "Generated reports"]
  },
  {
    id: "chat-app",
    titleFr: "Chat Temps RÃ©el",
    titleEn: "Real-Time Chat",
    descFr:
      "Chat en temps rÃ©el avec WebSocket : salles privÃ©es, indicateur de frappe, notifications push, et thÃ¨me sombre Ã©lÃ©gant.",
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
    images: ["/projects/chat-app.jpg"],
    featuresFr: [
      "Messagerie temps réel avec WebSocket",
      "Salles privées et publiques",
      "Indicateur de frappe en direct",
      "Notifications push",
      "Thème sombre élégant"
    ],
    featuresEn: [
      "Real-time messaging with WebSocket",
      "Private and public rooms",
      "Live typing indicator",
      "Push notifications",
      "Elegant dark theme"
    ],
    resultsFr: ["Chat temps réel fonctionnel", "Salles multiples", "Interface moderne"],
    resultsEn: ["Working real-time chat", "Multiple rooms", "Modern interface"]
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
    images: ["/projects/breakout-game.png"],
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
    images: ["/projects/monic.png"],
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

