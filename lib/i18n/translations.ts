// =============================================
// 🌍 Traductions — Fusion automatique
// Chaque fichier est dans lib/i18n/translations/
// =============================================

import common from "./translations/common";
import hero from "./translations/hero";
import about from "./translations/about";
import skills from "./translations/skills";
import education from "./translations/education";
import projects from "./translations/projects";
import cv from "./translations/cv";

export const languages = ["fr", "en"] as const;
export type Locale = (typeof languages)[number];

const translations = {
  fr: {
    ...common.fr,
    ...hero.fr,
    ...about.fr,
    ...skills.fr,
    ...education.fr,
    ...projects.fr,
    ...cv.fr,
  },
  en: {
    ...common.en,
    ...hero.en,
    ...about.en,
    ...skills.en,
    ...education.en,
    ...projects.en,
    ...cv.en,
  },
} as const;

export type TranslationKey = keyof (typeof translations)["fr"];
export default translations;
