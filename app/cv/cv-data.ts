export type CvCategory = "general" | "web" | "ai" | "games";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type LocalizedList = {
  fr: string[];
  en: string[];
};

export interface CvExperience {
  period: LocalizedText;
  role: LocalizedText;
  company: LocalizedText;
  tasks: LocalizedList;
}

export interface CvProject {
  title: LocalizedText;
  description: LocalizedText;
  techs: string[];
}

export type CvSkillGroupKey = "languages" | "frameworks" | "databases" | "tools" | "ai";
export type CvSkillGroups = Record<CvSkillGroupKey, string[]>;

const experienceWeb: CvExperience = {
  period: { fr: "2024 - Present", en: "2024 - Present" },
  role: { fr: "Développeur Web - Projets Personnels", en: "Web Developer - Personal Projects" },
  company: { fr: "Portfolio & Projets Techniques", en: "Portfolio & Technical Projects" },
  tasks: {
    fr: [
      "Conception d'applications web modernes (portfolio, e-commerce, dashboard)",
      "Front-end React/Next.js avec interfaces responsives",
      "Développement d'APIs, authentification et intégration de données",
      "Modélisation et requêtes SQL sur bases relationnelles",
      "Optimisation des performances, UX et qualité de code",
    ],
    en: [
      "Built modern web apps (portfolio, e-commerce, analytics dashboard)",
      "React/Next.js front-end with responsive UI",
      "Developed APIs, authentication, and data integration",
      "Data modeling and SQL queries on relational databases",
      "Improved performance, UX, and code quality",
    ],
  },
};

const experienceAcademic: CvExperience = {
  period: { fr: "2025", en: "2025" },
  role: {
    fr: "Projets académiques - développement logiciel et IoT",
    en: "Academic Projects - Software Development and IoT",
  },
  company: { fr: "Projet scolaire", en: "School Project" },
  tasks: {
    fr: [
      "Jeu de mémoire en Python avec score et stockage SQLite3",
      "Projet IoT capteur température/humidité avec collecte en temps réel",
      "Traitement et visualisation simple des données capteurs",
      "Applications pédagogiques pour la pratique des systèmes embarqués",
    ],
    en: [
      "Built a Python memory game with scoring and SQLite3 storage",
      "IoT temperature/humidity sensor project with real-time collection",
      "Processed sensor data for simple visualization",
      "Educational apps for embedded systems practice",
    ],
  },
};

const experienceGames: CvExperience = {
  period: { fr: "2025-2026", en: "2025-2026" },
  role: {
    fr: "Projet personnel - développement jeux vidéo et librairies C++",
    en: "Personal Project - Game Development and C++ Libraries",
  },
  company: { fr: "Projet individuel", en: "Individual Project" },
  tasks: {
    fr: [
      "Jeu Breakout en C++ (30 niveaux, menu, son, difficulté)",
      "Librairie C++ pour Raylib : sprites, animations, physique Box2D",
      "Renforcement des compétences en algorithmique et architecture",
      "Outils modulaires réutilisables pour jeux 2D",
    ],
    en: [
      "Breakout game in C++ (30 levels, menu, sound, difficulty)",
      "C++ library for Raylib: sprites, animations, Box2D physics",
      "Strengthened algorithms and software architecture skills",
      "Reusable modular tools for 2D game development",
    ],
  },
};

const webProjects: CvProject[] = [
  {
    title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
    description: {
      fr: "Site Next.js bilingue avec i18n, génération PDF du CV et design glassmorphism.",
      en: "Bilingual Next.js site with i18n, CV PDF generation, and glassmorphism design.",
    },
    techs: ["Next.js", "TypeScript", "CSS", "html2pdf.js"],
  },
  {
    title: { fr: "Plateforme E-Commerce Full Stack", en: "Full Stack E-Commerce Platform" },
    description: {
      fr: "Catalogue produits, panier et authentification avec interface responsive.",
      en: "Product catalog, cart, and authentication with responsive UI.",
    },
    techs: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: { fr: "QuizHub - Application Interactive", en: "QuizHub - Interactive App" },
    description: {
      fr: "Quiz dynamiques avec API Node/Express, scores et classement.",
      en: "Dynamic quizzes with Node/Express API, scores and leaderboard.",
    },
    techs: ["React", "TypeScript", "Node.js", "Express"],
  },
  {
    title: { fr: "Dashboard Analytics", en: "Analytics Dashboard" },
    description: {
      fr: "Dashboard analytics avec graphiques interactifs et mises à jour temps réel.",
      en: "Analytics dashboard with interactive charts and real-time updates.",
    },
    techs: ["React", "D3.js", "Node.js"],
  },
];

const gameProjects: CvProject[] = [
  {
    title: { fr: "Jeu de Mémoire", en: "Memory Game" },
    description: {
      fr: "Jeu Python avec score et sauvegarde SQLite3.",
      en: "Python game with scoring and SQLite3 persistence.",
    },
    techs: ["Python", "SQLite3"],
  },
  {
    title: { fr: "Jeu Breakout", en: "Breakout Game" },
    description: {
      fr: "Jeu C++ avec 30 niveaux, menu, son et difficulté.",
      en: "C++ game with 30 levels, menu, sound, and difficulty.",
    },
    techs: ["C++", "Raylib", "nlohmann/json"],
  },
];

const aiProjects: CvProject[] = [
  {
    title: { fr: "Classification d'images", en: "Image Classification" },
    description: {
      fr: "Modèle CNN pour classification d'images : data pipeline, entraînement, évaluation.",
      en: "CNN image classification: data pipeline, training, evaluation.",
    },
    techs: ["Python", "PyTorch", "NumPy"],
  },
  {
    title: { fr: "Chatbot NLP", en: "NLP Chatbot" },
    description: {
      fr: "Chatbot à intents : preprocessing, vectorisation, évaluation.",
      en: "Intent-based chatbot: preprocessing, vectorization, evaluation.",
    },
    techs: ["Python", "spaCy", "scikit-learn"],
  },
];

export const cvExperiencesByCategory: Record<CvCategory, CvExperience[]> = {
  general: [experienceWeb, experienceAcademic, experienceGames],
  web: [experienceWeb],
  ai: [experienceAcademic],
  games: [experienceGames],
};

export const cvProjectsByCategory: Record<CvCategory, CvProject[]> = {
  general: [...webProjects, ...gameProjects],
  web: webProjects,
  ai: aiProjects,
  games: gameProjects,
};

export const cvSkillsByCategory: Record<CvCategory, CvSkillGroups> = {
  general: {
    languages: ["C", "C++", "Python", "TypeScript", "JavaScript", "Rust", "SQL", "java"],
    frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion", "Prisma"],
    databases: ["PostgreSQL", "SQL", "Mysql"],
    tools: ["Git", "Docker", "Linux", "VS Code", "Figma"],
    ai: ["Machine Learning (scikit-learn)", "Analyse de donnees (pandas, numpy, seaborn)", "Mathematiques symboliques (sympy)"],
  },
  web: {
    languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
    databases: ["PostgreSQL", "MySQL", "Prisma"],
    tools: ["Git", "Docker", "Vercel", "Figma"],
    ai: [],
  },
  ai: {
    languages: ["Python"],
    frameworks: ["PyTorch", "TensorFlow", "scikit-learn"],
    databases: ["SQLite3", "PostgreSQL"],
    tools: ["Jupyter", "Git", "Docker"],
    ai: ["Computer Vision", "NLP", "Model evaluation"],
  },
  games: {
    languages: ["C++", "Python"],
    frameworks: ["Raylib"],
    databases: [],
    tools: ["Git", "CMake", "Visual Studio"],
    ai: [],
  },
};
