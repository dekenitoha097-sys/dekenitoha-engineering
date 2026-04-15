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

const experienceCyber: CvExperience = {
  period: { fr: "2024 - Présent", en: "2024 - Present" },
  role: { fr: "Étudiant en Cybersécurité - Pentest & Exploitation Offensive", en: "Cybersecurity Student - Pentest & Offensive Security" },
  company: { fr: "Auto-formation intensives & projets pratiques", en: "Intensive self-training & hands-on projects" },
  tasks: {
    fr: [
      "Pentest infrastructure approfondie: énumération Nmap (TCP/UDP/services), exploitation Metasploit (SSH, FTP, SMB), escalade de privilèges, lateral movement",
      "Tests de sécurité web avancés: Burp Suite proxy/intruder, XSS (Reflected/Stored/DOM), SQL injections, CSRF, XXE, SSRF, broken authentication",
      "Configuration & hardening serveurs de production: Nginx/Apache2, SSL/TLS robuste, gestion SSH keys, firewall iptables, WAF rules, fail2ban, monitoring",
      "Exploitation chaînée & documentation: reverse shells, post-exploitation, forensique, reports complets avec remediations professionnels",
      "CTF resolution (TryHackMe, picoCTF): énumeration réseau, exploitation services, escalade, reverse engineering, cryptographie, forensique",
    ],
    en: [
      "In-depth infrastructure penetration testing: Nmap enumeration (TCP/UDP/services), Metasploit exploitation (SSH, FTP, SMB), privilege escalation, lateral movement",
      "Advanced web security testing: Burp Suite proxy/intruder, XSS (Reflected/Stored/DOM), SQL injections, CSRF, XXE, SSRF, broken auth, API security",
      "Production server configuration & hardening: Nginx/Apache2 setup, robust SSL/TLS, SSH key management, iptables firewall, WAF rules, fail2ban, log monitoring",
      "Chained exploitation & documentation: reverse shells, post-exploitation techniques, forensics, professional reports with remediation strategies",
      "CTF challenges solving (TryHackMe, picoCTF): network enumeration, service exploitation, privilege escalation, reverse engineering, cryptography, forensics",
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
    title: { fr: "Exploitation Metasploitable - Attaque/Défense", en: "Metasploitable Exploitation - Attack/Defense" },
    description: {
      fr: "Environnement d'attaque & défense complet : énumération Services (SSH, FTP, Samba), exploitation de vulnérabilités critiques, simulation d'attaques composées, documentation des vecteurs d'attaque et défenses mitigation.",
      en: "Full attack & defense lab: Service enumeration (SSH, FTP, Samba), critical vulnerability exploitation, chain attacks simulation, attack vectors & mitigation strategies documentation.",
    },
    techs: ["Metasploitable", "Nmap", "Metasploit", "Hydra", "SSH", "Samba", "Linux"],
  },
  {
    title: { fr: "Tests Pénétration Web - Burp Suite Advanced", en: "Web Penetration Testing - Burp Suite Advanced" },
    description: {
      fr: "Tests approfondis d'applications web : vulnérabilités XSS (Reflected, DOM-based, Stored), injections SQL, CSRF, authentication bypass, XXE, SSRF. Interception proxy, fuzzing, exploitation chainée, report complet.",
      en: "Advanced web application security: XSS (Reflected, DOM-based, Stored), SQL injections, CSRF, broken auth, XXE, SSRF. Burp proxy interception, fuzzing, chained exploitation, full report.",
    },
    techs: ["Burp Suite", "HTTP/HTTPS", "JavaScript", "SQL", "XML", "Owasp Top 10"],
  },
  {
    title: { fr: "Configuration & Hardening Serveur Nginx/Apache2", en: "Nginx/Apache2 Server Hardening & Security" },
    description: {
      fr: "Setup sécurisé serveurs production : Configuration SSL/TLS robuste, certificats auto-signés & Let's Encrypt, SSH key management, firewall iptables, WAF rules, mitigation attaques DDoS, fail2ban, monitoring logs.",
      en: "Production-grade server security: SSL/TLS hardening, self-signed & Let's Encrypt certs, SSH key management, iptables firewall, WAF rules, DDoS mitigation, fail2ban, log monitoring.",
    },
    techs: ["Nginx", "Apache2", "Linux", "SSH", "SSL/TLS", "Let's Encrypt", "iptables", "fail2ban"],
  },
  {
    title: { fr: "TryHackMe - CTF Challenges & Write-ups", en: "TryHackMe - CTF Challenges & Write-ups" },
    description: {
      fr: "Résolution challenges CTF avancés : énumération réseau, exploitation services vulnerables, escalade de privilèges (sudo, SUID), reverse shells, forensique. Documentations complètes methodology & tools utilisés.",
      en: "Advanced CTF challenge solving: Network enumeration, vulnerable service exploitation, privilege escalation (sudo, SUID, capabilities), reverse shells, forensics. Full write-ups with methodology & tools.",
    },
    techs: ["Nmap", "Metasploit", "Gobuster", "sqlmap", "Burp Suite", "Wireshark", "Linux"],
  },
  {
    title: { fr: "picoCTF - Capture The Flag Competitions", en: "picoCTF - Competitive CTF Solving" },
    description: {
      fr: "Compétitions CTF : challenges reverse engineering, forensique, web security, cryptography. Énumération système, recherche vulnérabilités, exploitation coordonnée multiple vecteurs. Ranking & skill progression.",
      en: "Competitive CTF events: reverse engineering, forensics, web security, cryptography challenges. System enumeration, vulnerability research, coordinated multi-vector exploitation. Rankings & skill progression.",
    },
    techs: ["Python", "Linux", "Reverse Engineering", "Cryptography", "Web Security", "Forensics"],
  },
];

export const cvExperiencesByCategory: Record<CvCategory, CvExperience[]> = {
  general: [experienceCyber, experienceWeb, experienceAcademic, experienceGames],
  web: ENABLE_CV_VARIANTS ? [experienceWeb] : [],
  ai: ENABLE_CV_VARIANTS ? [experienceAcademic] : [],
  games: ENABLE_CV_VARIANTS ? [experienceGames] : [],
  nodejs: ENABLE_CV_VARIANTS ? [experienceNode] : [],
  cyber: ENABLE_CV_VARIANTS ? [experienceCyber] : [],
};

export const cvProjectsByCategory: Record<CvCategory, CvProject[]> = {
  general: [...cyberProjects, ...webProjects, ...gameProjects],
  web: ENABLE_CV_VARIANTS ? webProjects : [],
  ai: ENABLE_CV_VARIANTS ? aiProjects : [],
  games: ENABLE_CV_VARIANTS ? gameProjects : [],
  nodejs: ENABLE_CV_VARIANTS ? nodeProjects : [],
  cyber: ENABLE_CV_VARIANTS ? cyberProjects : [],
};

export const cvSkillsByCategory: Record<CvCategory, CvSkillGroups> = {
  general: {
    languages: ["Python", "Bash", "C", "C++", "JavaScript", "TypeScript", "Rust", "SQL"],
    frameworks: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "Gobuster", "Hydra", "React", "Next.js", "Node.js"],
    databases: ["PostgreSQL", "MySQL", "SQLite3"],
    api: ["HTTP/HTTPS", "TCP/IP", "SSH", "SMB", "FTP", "REST", "JSON", "JWT"],
    tools: ["Linux (Kali, Ubuntu)", "Windows", "VMware", "Docker", "Git", "Nginx", "Apache2"],
    other: ["sqlmap", "john the Ripper", "hashcat", "CyberChef", "Tailwind CSS", "Figma", "Reverse Engineering"],
    ai: ["Machine Learning (scikit-learn)", "Analyse de donnees (pandas, numpy)", "Mathematiques symboliques (sympy)"],
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
    fr: "Étudiant en 2e année d'ingénierie informatique avec expertise offensive en cybersécurité. Spécialisé en tests de pénétration, exploitation de vulnérabilités critiques et sécurisation d'infrastructure. Maîtrise complète des outils professionnels: Burp Suite, Metasploit, Nmap, Wireshark. Expérience complémentaire en développement web full-stack (Next.js, Node.js). Autonome, méthodique, et orienté résolution de problèmes de sécurité.",
    en: "2nd year engineering student with offensive cybersecurity expertise. Specialized in penetration testing, critical vulnerability exploitation, and infrastructure hardening. Full mastery of professional tools: Burp Suite, Metasploit, Nmap, Wireshark. Complementary full-stack web development experience (Next.js, Node.js). Autonomous, methodical, and security problem-solving oriented.",
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
        fr: "Étudiant en 2e année d'ingénierie informatique avec spécialisation offensive en cybersécurité. Expertise pratique avancée en tests de pénétration (infrastructure & web), exploitation de vulnérabilités critiques, et sécurisation d'infrastructures. Maîtrise complète des outils standards de l'industrie: Burp Suite, Metasploit, Nmap, Wireshark, Gobuster, Hydra. Méthodologie structurée, documentation professionnelle, responsabilité éthique. Prêt pour stage pentest ou alternance en sécurité offensive.",
        en: "2nd year computer engineering student with offensive cybersecurity specialization. Advanced hands-on expertise in penetration testing (infrastructure & web), critical vulnerability exploitation, infrastructure hardening. Full mastery of industry-standard tools: Burp Suite, Metasploit, Nmap, Wireshark, Gobuster, Hydra. Structured methodology, professional documentation, ethical responsibility. Ready for pentest internship or offensive security role.",
      }
    : null,
};

export const cvHeaderByCategory: Record<CvCategory, CvHeaderOverride> = {
  general: {
    role: { fr: "Pentesteur / Étudiant en Sécurité Offensive", en: "Penetration Tester / Offensive Security Student" },
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
        role: { fr: "Pentesteur / Étudiant en Sécurité Offensive", en: "Penetration Tester / Offensive Security Student" },
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
