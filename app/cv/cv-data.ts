export type CvCategory = "general" | "web" | "ai" | "games" | "nodejs" | "cyber";

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
      "Applications web modernes: Next.js, React, TypeScript avec architectures scalables",
      "Développement full-stack: APIs RESTful, authentification, bases de données SQL/NoSQL",
      "Déploiement et optimisation: Docker, CI/CD, performance et UX",
    ],
    en: [
      "Modern web apps: Next.js, React, TypeScript with scalable architecture",
      "Full-stack development: RESTful APIs, authentication, SQL/NoSQL databases",
      "Deployment & optimization: Docker, CI/CD, performance and UX",
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

const experienceCyber: CvExperience = {
  period: { fr: "2024 - Présent", en: "2024 - Present" },
  role: { fr: "Étudiant en Cybersécurité - Pentest & Exploitation Offensive", en: "Cybersecurity Student - Pentest & Offensive Security" },
  company: { fr: "Auto-formation intensives & projets pratiques", en: "Intensive self-training & hands-on projects" },
  tasks: {
    fr: [
      "Pentest infrastructure: Nmap, Metasploit, exploitations SSH/FTP/SMB, escalade de privilèges, lateral movement",
      "Sécurité web: Burp Suite (XSS, SQLi, CSRF, XXE, SSRF, auth bypass), OWASP Top 10, fuzzing et exploitation chaînée",
      "Hardening serveur: Nginx/Apache2, SSL/TLS, SSH keys, firewall iptables, WAF, fail2ban, monitoring logs",
      "Résolution CTF (TryHackMe, picoCTF): énumération, exploitation, escalade, reverse engineering, cryptographie, forensique",
    ],
    en: [
      "Infrastructure penetration: Nmap, Metasploit, SSH/FTP/SMB exploitation, privilege escalation, lateral movement",
      "Web security: Burp Suite (XSS, SQLi, CSRF, XXE, SSRF, auth bypass), OWASP Top 10, fuzzing & chained exploitation",
      "Server hardening: Nginx/Apache2, SSL/TLS, SSH keys, iptables firewall, WAF, fail2ban, log monitoring",
      "CTF solving (TryHackMe, picoCTF): enumeration, exploitation, escalation, reverse engineering, cryptography, forensics",
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

const cyberProjects: CvProject[] = [
  {
    title: { fr: "Exploitation Metasploitable - Pentest Complet", en: "Metasploitable Exploitation - Full Pentest" },
    description: {
      fr: "Pentest infrastructure complète: énumération services (SSH, FTP, Samba), exploitation vulnérabilités Metasploit, escalade privilèges, documentation attaque/défense.",
      en: "Full infrastructure pentest: service enumeration (SSH, FTP, Samba), Metasploit exploitation, privilege escalation, attack/defense documentation.",
    },
    techs: ["Metasploitable", "Nmap", "Metasploit", "Hydra", "Linux"],
  },
  {
    title: { fr: "Pentest Web - Burp Suite", en: "Web Penetration Testing - Burp Suite" },
    description: {
      fr: "Tests sécurité web: XSS (Reflected/Stored/DOM), SQL injections, CSRF, XXE, SSRF, authentication bypass. Interception proxy, fuzzing, exploitation chaînée.",
      en: "Web security testing: XSS (Reflected/Stored/DOM), SQL injections, CSRF, XXE, SSRF, auth bypass. Proxy interception, fuzzing, chained exploitation.",
    },
    techs: ["Burp Suite", "HTTP/HTTPS", "SQL", "OWASP Top 10"],
  },
  {
    title: { fr: "Sécurisation Serveur Nginx/Apache2", en: "Nginx/Apache2 Server Security" },
    description: {
      fr: "Production server hardening: SSL/TLS robuste, certificats Let's Encrypt, SSH management, firewall iptables, WAF, fail2ban, monitoring.",
      en: "Production server hardening: robust SSL/TLS, Let's Encrypt certs, SSH management, iptables firewall, WAF, fail2ban, log monitoring.",
    },
    techs: ["Nginx", "Apache2", "SSL/TLS", "iptables", "fail2ban"],
  },
  {
    title: { fr: "Résolution CTF (TryHackMe & picoCTF)", en: "CTF Solving (TryHackMe & picoCTF)" },
    description: {
      fr: "Challenges CTF multi-domaines: énumération réseau, exploitation, escalade privilèges, reverse engineering, cryptographie, forensique.",
      en: "Multi-domain CTF challenges: network enumeration, exploitation, privilege escalation, reverse engineering, cryptography, forensics.",
    },
    techs: ["Nmap", "Metasploit", "Burp Suite", "Wireshark", "Python", "Linux"],
  },
];

export const cvExperiencesByCategory: Record<CvCategory, CvExperience[]> = {
  general: [experienceCyber, experienceWeb],
  web: ENABLE_CV_VARIANTS ? [experienceWeb] : [],
  ai: ENABLE_CV_VARIANTS ? [experienceAcademic] : [],
  games: ENABLE_CV_VARIANTS ? [experienceGames] : [],
  nodejs: ENABLE_CV_VARIANTS ? [experienceNode] : [],
  cyber: ENABLE_CV_VARIANTS ? [experienceCyber] : [],
};

export const cvProjectsByCategory: Record<CvCategory, CvProject[]> = {
  general: cyberProjects,
  web: ENABLE_CV_VARIANTS ? webProjects : [],
  ai: ENABLE_CV_VARIANTS ? aiProjects : [],
  games: ENABLE_CV_VARIANTS ? gameProjects : [],
  nodejs: ENABLE_CV_VARIANTS ? nodeProjects : [],
  cyber: ENABLE_CV_VARIANTS ? cyberProjects : [],
};

export const cvSkillsByCategory: Record<CvCategory, CvSkillGroups> = {
  general: {
    languages: ["Python", "Bash", "C", "C++", "JavaScript", "SQL"],
    frameworks: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Gobuster", "Hydra"],
    databases: ["PostgreSQL", "MySQL"],
    api: ["HTTP/HTTPS", "TCP/IP", "SSH", "SMB", "FTP", "REST", "JWT"],
    tools: ["Linux (Kali, Ubuntu)", "Windows", "VMware", "Docker", "Nginx", "Apache2"],
    other: ["sqlmap", "john the Ripper", "hashcat", "CyberChef", "Reverse Engineering"],
    ai: [],
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
  cyber: ENABLE_CV_VARIANTS
    ? {
        languages: ["Python", "Bash", "C", "C++", "JavaScript", "SQL"],
        frameworks: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Gobuster", "Hydra"],
        databases: [],
        api: ["HTTP/HTTPS", "TCP/IP", "SSH", "SMB", "FTP", "DNS", "SNMP"],
        tools: ["Linux (Kali, Ubuntu)", "Windows", "VMware", "Docker", "Git", "Reverse Engineering"],
        other: ["sqlmap", "john the Ripper", "hashcat", "CyberChef", "Shodan", "theHarvester", "Aircrack-ng"],
        ai: [],
      }
    : emptySkills,
};

export const cvProfileByCategory: Record<CvCategory, LocalizedText | null> = {
  general: {
    fr: "Étudiant en classe préparatoire d'ingénierie informatique (2e année). Orientation future: cybersécurité et pentest. Pratique active: Burp Suite, Metasploit, Nmap, CTF challenges. Méthodique, autonome et motivé par la sécurité offensive.",
    en: "Engineering high school student - computing (2nd year). Future orientation: cybersecurity and penetration testing. Active practice: Burp Suite, Metasploit, Nmap, CTF challenges. Methodical, autonomous, and motivated by offensive security.",
  },
  web: null,
  ai: null,
  games: null,
  nodejs: ENABLE_CV_VARIANTS
    ? {
        fr: "Étudiant en 2e année d'ingénierie informatique et IA, passionné par le développement backend, Node.js et les architectures scalables. Expérience dans la conception d'APIs RESTful, l'intégration de bases SQL/NoSQL et le déploiement d'applications web. Autonome, rigoureux et orienté résolution de problèmes, je cherche à contribuer à des projets innovants dans un environnement Agile.",
        en: "Computer science and AI engineering student focused on Node.js backend and scalable architectures. Experience designing RESTful APIs, integrating SQL/NoSQL databases, and deploying web applications. Autonomous, rigorous, and problem-solving oriented, I aim to contribute to innovative projects in an Agile environment.",
      }
    : null,
  cyber: ENABLE_CV_VARIANTS
    ? {
        fr: "Étudiant en classe préparatoire d'ingénierie informatique (2e année), orientation cybersécurité et pentest. Pratique active: Burp Suite, Metasploit, Nmap, Wireshark. Expérience: pentest infrastructure, tests web (XSS, SQLi, CSRF, XXE, SSRF), hardening serveur, CTF challenges. Méthodique, responsable et motivé par la sécurité offensive.",
        en: "2nd year engineering high school student, cybersecurity and penetration testing oriented. Active practice: Burp Suite, Metasploit, Nmap, Wireshark. Experience: infrastructure pentest, web security testing (XSS, SQLi, CSRF, XXE, SSRF), server hardening, CTF challenges. Methodical, responsible, and motivated by offensive security.",
      }
    : null,
};

export const cvHeaderByCategory: Record<CvCategory, CvHeaderOverride> = {
  general: {
    role: { fr: "Étudiant Prépa • Cybersécurité", en: "Engineering Student • Cybersecurity" },
  },
  web: {},
  ai: {},
  games: {},
  nodejs: ENABLE_CV_VARIANTS
    ? {
        role: { fr: "Développeur Node.js / Backend", en: "Node.js / Backend Developer" },
        phone: "+212 681870979",
      }
    : {},
  cyber: ENABLE_CV_VARIANTS
    ? {
        role: { fr: "Étudiant Prépa - Orientation Cybersécurité", en: "Engineering Student - Cybersecurity Oriented" },
        phone: "+212 681870979",
      }
    : {},
};

export const cvSoftSkillsByCategory: Record<CvCategory, LocalizedList | null> = {
  general: {
    fr: [
      "Pensée analytique & méthodologie structurée",
      "Gestion responsable de vulnérabilités",
      "Documentation technique détaillée",
      "Communication technique claire",
    ],
    en: [
      "Analytical thinking & structured methodology",
      "Responsible vulnerability management",
      "Detailed technical documentation",
      "Clear technical communication",
    ],
  },
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
  cyber: ENABLE_CV_VARIANTS
    ? {
        fr: [
          "Pensée analytique & méthodologie structurée",
          "Gestion responsable de vulnérabilités",
          "Documentation technique détaillée",
          "Apprentissage autonome & pratique intensive",
          "Communication technique claire et vulgarisation",
        ],
        en: [
          "Analytical thinking & structured methodology",
          "Responsible vulnerability management",
          "Detailed technical documentation",
          "Autonomous learning & hands-on practice",
          "Clear technical communication",
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
  cyber: ENABLE_CV_VARIANTS
    ? {
        fr: [
          "Pentest d'infrastructures critiques",
          "Veille en sécurité offensive & défensive",
          "Développement d'exploits et d'outils",
          "Bug bounty programs et responsabilité",
          "IA et Machine Learning appliqués à la sécurité",
        ],
        en: [
          "Critical infrastructure penetration testing",
          "Offensive & defensive security awareness",
          "Exploit and security tool development",
          "Bug bounty programs and responsible disclosure",
          "AI and Machine Learning applied to security",
        ],
      }
    : null,
};
