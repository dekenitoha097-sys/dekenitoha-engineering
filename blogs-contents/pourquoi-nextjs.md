---
title: "Pourquoi j'ai choisi Next.js pour mon portfolio"
titleEn: "Why I chose Next.js for my portfolio"
date: "2025-01-15"
excerpt: "Retour d'expérience sur le choix de Next.js comme framework pour construire un portfolio moderne, performant et maintenable."
excerptEn: "Feedback on choosing Next.js as a framework to build a modern, performant and maintainable portfolio."
tags: ["Next.js", "React", "Web Dev"]
readTime: 5
coverColor: "#0070f3"
---

# Pourquoi j'ai choisi Next.js pour mon portfolio

Quand j'ai décidé de construire mon portfolio, j'avais plusieurs options : React pur, Gatsby, Astro, ou Next.js. Voici pourquoi Next.js a été le choix final.

## Les critères de sélection

1. **Performance** — Le site devait charger en moins de 2 secondes
2. **SEO** — Les pages devaient être indexables par les moteurs de recherche
3. **Flexibilité** — Pouvoir mélanger SSR, SSG et client-side rendering
4. **Écosystème** — Une communauté active et des outils matures

## L'App Router : un game-changer

L'App Router de Next.js 14+ offre une architecture basée sur les fichiers qui simplifie énormément le routing. Chaque dossier dans `app/` devient une route.

```typescript
// app/projects/page.tsx → /projects
// app/blogs/[slug]/page.tsx → /blogs/mon-article

const age = 19;
console.log(age);
```

## Le Server-Side Rendering

Avec Next.js, chaque page peut choisir sa stratégie de rendu. Pour un portfolio, le SSG (Static Site Generation) est parfait : le contenu change rarement et les pages sont pré-rendues.

## Conclusion

Next.js offre le meilleur compromis entre performance, flexibilité et developer experience. C'est un choix que je recommande pour tout projet portfolio.
