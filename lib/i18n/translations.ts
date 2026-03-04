export const languages = ["fr", "en"] as const;
export type Locale = (typeof languages)[number];

const translations = {
  fr: {
    // Header
    "nav.about": "À propos",
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

    // Social
    "social.github": "GitHub",
    "social.linkedin": "LinkedIn",
    "social.email": "Email",
    "social.cv": "Curriculum",
  },
  en: {
    // Header
    "nav.about": "About",
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

    // Social
    "social.github": "GitHub",
    "social.linkedin": "LinkedIn",
    "social.email": "Email",
    "social.cv": "Resume",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["fr"];
export default translations;
