export const languages = ["fr", "en"] as const;
export type Locale = (typeof languages)[number];

const translations = {
  fr: {
    // Header
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.education": "Éducation",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.cta": "Commencer",
    "brand": "Portfolio",

    // Hero
    "hero.greeting": "Bonjour, je suis",
    "hero.firstName": "DEKENI",
    "hero.lastName": "Toha",
    "hero.description":
      "Étudiant en 2ème année d'Informatique & IA | Développeur Web <strong>Full Stack</strong> | Passionné par l'innovation technologique et la résolution de défis complexes",
    "hero.socialLabel": "Réseaux & Contact",
    "hero.cta.contact": "Me Contacter",
    "hero.cta.projects": "Voir mes Projets",
    "hero.badge": "2ème Année · Info & IA",

    // About
    "about.eyebrow": "À PROPOS",
    "about.title.line1": "Qui suis-je",
    "about.title.highlight": "?",
    "about.description": "Étudiant passionné en 2ème année d'Informatique & Intelligence Artificielle, je conçois des expériences web modernes et performantes. Mon approche allie rigueur technique et sensibilité créative pour transformer des idées en produits digitaux impactants.",
    "about.stat.projects": "Projets",
    "about.stat.projects.value": "15+",
    "about.stat.experience": "Ans d'expérience",
    "about.stat.experience.value": "2+",
    "about.stat.technologies": "Technologies",
    "about.stat.technologies.value": "20+",
    "about.stat.satisfaction": "Satisfaction",
    "about.stat.satisfaction.value": "100%",
    "about.passion.title": "Ma Passion",
    "about.passion.description": "Je suis animé par la volonté de créer des solutions élégantes à des problèmes complexes. Chaque ligne de code est une opportunité d'innover.",
    "about.approach.title": "Mon Approche",
    "about.approach.description": "Clean code, design thinking et amélioration continue. Je crois en la puissance d'un code bien structuré et d'une UI soignée.",
    "about.cta": "Télécharger mon CV",
    "about.seeMore": "En savoir plus",

    // About Page - Détaillé
    "aboutPage.hero.eyebrow": "À PROPOS DE MOI",
    "aboutPage.hero.title": "Développeur Full Stack",
    "aboutPage.hero.titleHighlight": "& Passionné d'IA",
    "aboutPage.hero.bio": "Je m'appelle DEKENI Toha, étudiant en 2ème année d'Informatique et Intelligence Artificielle. Je conçois des expériences web modernes, performantes et accessibles. Mon objectif : transformer chaque idée en un produit digital qui fait la différence.",
    "aboutPage.hero.location": "Basé à Lomé, Togo",
    "aboutPage.hero.status": "Disponible pour freelance",

    // Timeline
    "aboutPage.timeline.eyebrow": "PARCOURS",
    "aboutPage.timeline.title": "Mon",
    "aboutPage.timeline.titleHighlight": "Parcours",
    "aboutPage.timeline.1.year": "2024 - Présent",
    "aboutPage.timeline.1.title": "2ème Année — Informatique & IA",
    "aboutPage.timeline.1.description": "Approfondissement en algorithmes, machine learning, développement web avancé et bases de données.",
    "aboutPage.timeline.2.year": "2023 - 2024",
    "aboutPage.timeline.2.title": "1ère Année — Sciences Informatiques",
    "aboutPage.timeline.2.description": "Fondamentaux de la programmation, structures de données, introduction au développement web et aux réseaux.",
    "aboutPage.timeline.3.year": "2023",
    "aboutPage.timeline.3.title": "Premiers Projets Freelance",
    "aboutPage.timeline.3.description": "Création de sites web pour des clients locaux. Découverte de React, Next.js et du développement full stack.",
    "aboutPage.timeline.4.year": "2022",
    "aboutPage.timeline.4.title": "Début de l'aventure Code",
    "aboutPage.timeline.4.description": "Premiers pas en HTML, CSS et JavaScript. Passion immédiate pour la création d'interfaces utilisateur.",

    // Tech Stack
    "aboutPage.tech.eyebrow": "TECHNOLOGIES",
    "aboutPage.tech.title": "Ma Stack",
    "aboutPage.tech.titleHighlight": "Technique",
    "aboutPage.tech.software": "Ingénierie Logicielle",
    "aboutPage.tech.web": "Développement Web",
    "aboutPage.tech.ai": "Intelligence Artificielle",
    "aboutPage.tech.databases": "Bases de Données",
    "aboutPage.tech.tools": "Outils & Systèmes",

    // Social
    "social.github": "GitHub",
    "social.linkedin": "LinkedIn",
    "social.email": "Email",
    "social.cv": "Curriculum",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.cta": "Get Started",
    "brand": "Portfolio",

    // Hero
    "hero.greeting": "Hello, I am",
    "hero.firstName": "DEKENI",
    "hero.lastName": "Toha",
    "hero.description":
      "2nd year Computer Science & AI student | <strong>Full Stack</strong> Web Developer | Passionate about technological innovation and solving complex challenges",
    "hero.socialLabel": "Social & Contact",
    "hero.cta.contact": "Contact Me",
    "hero.cta.projects": "View Projects",
    "hero.badge": "2nd Year · CS & AI",

    // About
    "about.eyebrow": "ABOUT ME",
    "about.title.line1": "Who am I",
    "about.title.highlight": "?",
    "about.description": "A passionate 2nd year Computer Science & AI student, I build modern, high-performance web experiences. My approach blends technical rigor with creative sensibility to transform ideas into impactful digital products.",
    "about.stat.projects": "Projects",
    "about.stat.projects.value": "15+",
    "about.stat.experience": "Years of experience",
    "about.stat.experience.value": "2+",
    "about.stat.technologies": "Technologies",
    "about.stat.technologies.value": "20+",
    "about.stat.satisfaction": "Satisfaction",
    "about.stat.satisfaction.value": "100%",
    "about.passion.title": "My Passion",
    "about.passion.description": "I'm driven by the desire to craft elegant solutions to complex problems. Every line of code is an opportunity to innovate.",
    "about.approach.title": "My Approach",
    "about.approach.description": "Clean code, design thinking and continuous improvement. I believe in the power of well-structured code and polished UI.",
    "about.cta": "Download my CV",
    "about.seeMore": "See more",

    // About Page - Detailed
    "aboutPage.hero.eyebrow": "ABOUT ME",
    "aboutPage.hero.title": "Full Stack Developer",
    "aboutPage.hero.titleHighlight": "& AI Enthusiast",
    "aboutPage.hero.bio": "I'm DEKENI Toha, a 2nd year Computer Science & AI student. I build modern, high-performance, and accessible web experiences. My goal: turn every idea into a digital product that makes a difference.",
    "aboutPage.hero.location": "Based in Lomé, Togo",
    "aboutPage.hero.status": "Available for freelance",

    // Timeline
    "aboutPage.timeline.eyebrow": "JOURNEY",
    "aboutPage.timeline.title": "My",
    "aboutPage.timeline.titleHighlight": "Journey",
    "aboutPage.timeline.1.year": "2024 - Present",
    "aboutPage.timeline.1.title": "2nd Year — Computer Science & AI",
    "aboutPage.timeline.1.description": "Deep dive into algorithms, machine learning, advanced web development and databases.",
    "aboutPage.timeline.2.year": "2023 - 2024",
    "aboutPage.timeline.2.title": "1st Year — Computer Science",
    "aboutPage.timeline.2.description": "Programming fundamentals, data structures, introduction to web development and networking.",
    "aboutPage.timeline.3.year": "2023",
    "aboutPage.timeline.3.title": "First Freelance Projects",
    "aboutPage.timeline.3.description": "Building websites for local clients. Discovered React, Next.js and full stack development.",
    "aboutPage.timeline.4.year": "2022",
    "aboutPage.timeline.4.title": "The Coding Adventure Begins",
    "aboutPage.timeline.4.description": "First steps with HTML, CSS and JavaScript. Instant passion for crafting user interfaces.",

    // Tech Stack
    "aboutPage.tech.eyebrow": "TECHNOLOGIES",
    "aboutPage.tech.title": "My Tech",
    "aboutPage.tech.titleHighlight": "Stack",
    "aboutPage.tech.software": "Software Engineering",
    "aboutPage.tech.web": "Web Development",
    "aboutPage.tech.ai": "Artificial Intelligence",
    "aboutPage.tech.databases": "Databases",
    "aboutPage.tech.tools": "Tools & Systems",

    // Social
    "social.github": "GitHub",
    "social.linkedin": "LinkedIn",
    "social.email": "Email",
    "social.cv": "Resume",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["fr"];
export default translations;
