export type CvCategory = "general" | "web" | "ai" | "games" | "nodejs";

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

export type CvSkillGroupKey = "languages" | "frameworks" | "databases" | "api" | "tools" | "other" | "ai";
export type CvSkillGroups = Record<CvSkillGroupKey, string[]>;

export type CvHeaderOverride = Partial<{
  name: string;
  role: LocalizedText;
  location: LocalizedText;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
}>;

const ENABLE_CV_VARIANTS = true;
const emptySkills: CvSkillGroups = {
  languages: [],
  frameworks: [],
  databases: [],
  api: [],
  tools: [],
  other: [],
  ai: [],
};

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

const experienceNode: CvExperience = {
  period: { fr: "2024 - Présent", en: "2024 - Present" },
  role: { fr: "Développeur Web & Backend - Projets Personnels", en: "Web & Backend Developer - Personal Projects" },
  company: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
  tasks: {
    fr: [
      "Conception d'applications web full-stack avec Node.js, Express et bases SQL/NoSQL",
      "Développement d'APIs RESTful sécurisées avec authentification JWT",
      "Intégration front-end avec React/Next.js et optimisation UX",
      "Modélisation et requêtes SQL/PostgreSQL/MySQL, gestion des relations et performances",
      "Déploiement avec Docker, CI/CD sur Vercel et environnements de test",
    ],
    en: [
      "Built full-stack web apps with Node.js, Express, and SQL/NoSQL databases",
      "Developed secure RESTful APIs with JWT authentication",
      "Front-end integration with React/Next.js and UX optimization",
      "SQL/PostgreSQL/MySQL modeling, queries, and performance tuning",
      "Deployment with Docker, CI/CD on Vercel, and test environments",
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

const nodeProjects: CvProject[] = [
  {
    title: { fr: "QuizHub", en: "QuizHub" },
    description: {
      fr: "Application de quiz avec API Node/Express, stockage des scores et classement en temps réel.",
      en: "Quiz app with Node/Express API, score storage, and real-time leaderboard.",
    },
    techs: ["Node.js", "Express", "React", "TypeScript"],
  },
  {
    title: { fr: "Dashboard Analytics", en: "Analytics Dashboard" },
    description: {
      fr: "Dashboard temps réel avec Node.js, D3.js et intégration React.",
      en: "Real-time dashboard with Node.js, D3.js, and React integration.",
    },
    techs: ["Node.js", "D3.js", "React"],
  },
  {
    title: { fr: "Plateforme E-Commerce", en: "E-Commerce Platform" },
    description: {
      fr: "Catalogue, panier et authentification avec Next.js, Node.js et bases SQL.",
      en: "Catalog, cart, and authentication with Next.js, Node.js, and SQL databases.",
    },
    techs: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
    description: {
      fr: "Site Next.js bilingue avec génération PDF du CV et design glassmorphism.",
      en: "Bilingual Next.js site with CV PDF generation and glassmorphism design.",
    },
    techs: ["Next.js", "TypeScript", "CSS"],
  },
];

export const cvExperiencesByCategory: Record<CvCategory, CvExperience[]> = {
  general: [experienceWeb, experienceAcademic, experienceGames],
  web: ENABLE_CV_VARIANTS ? [experienceWeb] : [],
  ai: ENABLE_CV_VARIANTS ? [experienceAcademic] : [],
  games: ENABLE_CV_VARIANTS ? [experienceGames] : [],
  nodejs: ENABLE_CV_VARIANTS ? [experienceNode] : [],
};

export const cvProjectsByCategory: Record<CvCategory, CvProject[]> = {
  general: [...webProjects, ...gameProjects],
  web: ENABLE_CV_VARIANTS ? webProjects : [],
  ai: ENABLE_CV_VARIANTS ? aiProjects : [],
  games: ENABLE_CV_VARIANTS ? gameProjects : [],
  nodejs: ENABLE_CV_VARIANTS ? nodeProjects : [],
};

export const cvSkillsByCategory: Record<CvCategory, CvSkillGroups> = {
  general: {
    languages: ["C", "C++", "Python", "TypeScript", "JavaScript", "Rust", "SQL", "java"],
    frameworks: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion", "Prisma"],
    databases: ["PostgreSQL", "SQL", "Mysql"],
    api: [],
    tools: ["Git", "Docker", "Linux", "VS Code", "Figma"],
    other: [],
    ai: ["Machine Learning (scikit-learn)", "Analyse de donnees (pandas, numpy, seaborn)", "Mathematiques symboliques (sympy)"],
  },
  web: ENABLE_CV_VARIANTS
    ? {
        languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
        frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
        databases: ["PostgreSQL", "MySQL", "Prisma"],
        api: [],
        tools: ["Git", "Docker", "Vercel", "Figma"],
        other: [],
        ai: [],
      }
    : emptySkills,
  ai: ENABLE_CV_VARIANTS
    ? {
        languages: ["Python"],
        frameworks: ["PyTorch", "TensorFlow", "scikit-learn"],
        databases: ["SQLite3", "PostgreSQL"],
        api: [],
        tools: ["Jupyter", "Git", "Docker"],
        other: [],
        ai: ["Computer Vision", "NLP", "Model evaluation"],
      }
    : emptySkills,
  games: ENABLE_CV_VARIANTS
    ? {
        languages: ["C++", "Python"],
        frameworks: ["Raylib"],
        databases: [],
        api: [],
        tools: ["Git", "CMake", "Visual Studio"],
        other: [],
        ai: [],
      }
    : emptySkills,
  nodejs: ENABLE_CV_VARIANTS
    ? {
        languages: ["Node.js", "TypeScript", "JavaScript", "Python", "C/C++"],
        frameworks: ["Express.js", "React", "Next.js", "Tailwind CSS"],
        databases: ["PostgreSQL", "MySQL", "Prisma"],
        api: ["REST", "JSON", "JWT", "OAuth"],
        tools: ["Docker", "Git", "CI/CD", "Vercel"],
        other: ["Figma", "Modélisation 3D"],
        ai: [],
      }
    : emptySkills,
};

export const cvProfileByCategory: Record<CvCategory, LocalizedText | null> = {
  general: null,
  web: null,
  ai: null,
  games: null,
  nodejs: ENABLE_CV_VARIANTS
    ? {
        fr: "Étudiant en 2e année d'ingénierie informatique et IA, passionné par le développement backend, Node.js et les architectures scalables. Expérience dans la conception d'APIs RESTful, l'intégration de bases SQL/NoSQL et le déploiement d'applications web. Autonome, rigoureux et orienté résolution de problèmes, je cherche à contribuer à des projets innovants dans un environnement Agile.",
        en: "Computer science and AI engineering student focused on Node.js backend and scalable architectures. Experience designing RESTful APIs, integrating SQL/NoSQL databases, and deploying web applications. Autonomous, rigorous, and problem-solving oriented, I aim to contribute to innovative projects in an Agile environment.",
      }
    : null,
};

export const cvHeaderByCategory: Record<CvCategory, CvHeaderOverride> = {
  general: {},
  web: {},
  ai: {},
  games: {},
  nodejs: ENABLE_CV_VARIANTS
    ? {
        role: { fr: "Développeur Node.js / Backend", en: "Node.js / Backend Developer" },
        phone: "+212 681870979",
      }
    : {},
};

export const cvSoftSkillsByCategory: Record<CvCategory, LocalizedList | null> = {
  general: null,
  web: null,
  ai: null,
  games: null,
  nodejs: ENABLE_CV_VARIANTS
    ? {
        fr: [
          "Travail en équipe & communication",
          "Résolution de problèmes techniques",
          "Autonomie et apprentissage rapide",
          "Gestion de projets et veille technologique",
        ],
        en: [
          "Teamwork & communication",
          "Technical problem solving",
          "Autonomy and fast learning",
          "Project management and tech watch",
        ],
      }
    : null,
};

export const cvInterestsByCategory: Record<CvCategory, LocalizedList | null> = {
  general: null,
  web: null,
  ai: null,
  games: null,
  nodejs: ENABLE_CV_VARIANTS
    ? {
        fr: [
          "Cybersécurité et IA",
          "Open source et communautés dev",
          "Design UI/UX et innovation technologique",
          "Dessin et modélisation 3D",
        ],
        en: [
          "Cybersecurity and AI",
          "Open source and dev communities",
          "UI/UX design and tech innovation",
          "Drawing and 3D modeling",
        ],
      }
    : null,
};
