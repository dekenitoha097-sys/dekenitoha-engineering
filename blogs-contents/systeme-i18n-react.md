---
title: "Créer un système i18n custom en React"
titleEn: "Building a custom i18n system in React"
date: "2025-03-01"
excerpt: "Comment j'ai construit un système de traduction bilingue FR/EN léger et typé pour mon portfolio, sans aucune librairie externe."
excerptEn: "How I built a lightweight, typed bilingual FR/EN translation system for my portfolio, without any external library."
tags: ["React", "TypeScript", "i18n"]
readTime: 6
coverColor: "#22c55e"
---

# Créer un système i18n custom en React

Les bibliothèques i18n comme `react-intl` ou `next-intl` sont puissantes, mais parfois overkill pour un portfolio bilingue. Voici comment j'ai créé le mien.

## L'architecture

```
lib/i18n/
├── index.tsx          # Provider + hook useTranslation
├── translations.ts    # Fusion de tous les fichiers
└── translations/
    ├── common.ts
    ├── hero.ts
    ├── about.ts
    └── ...
```

## Le Context Provider

```tsx
const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}>({} as any);
```

## Typage automatique des clés

L'astuce clé : TypeScript déduit automatiquement toutes les clés de traduction valides.

```typescript
export type TranslationKey = keyof (typeof translations)["fr"];
```

Ainsi, `t("hero.title")` est typé et l'autocomplétion fonctionne parfaitement dans VS Code.

## Avantages de cette approche

1. **Zéro dépendance** — Pas de librairie externe
2. **Type-safe** — Erreur de compilation si une clé n'existe pas
3. **Léger** — Quelques Ko vs plusieurs dizaines pour une lib
4. **Flexible** — Organisation libre des fichiers de traduction

## Conclusion

Pour un projet de taille moyenne comme un portfolio, un système i18n custom est souvent la meilleure option. Simple, typé, et parfaitement adapté à vos besoins.
