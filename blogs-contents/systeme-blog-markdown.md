---
title: "Comment j'ai créé un système de blog avec Markdown"
titleEn: "How I Created a Blog System with Markdown"
description: "Découvrez comment j'ai implémenté un système de blog statique en utilisant des fichiers Markdown et Next.js."
descriptionEn: "Discover how I implemented a static blog system using Markdown files and Next.js."
excerpt: "Un guide complet pour créer votre propre système de blog performant avec Markdown et Next.js."
excerptEn: "A complete guide to creating your own performant blog system with Markdown and Next.js."
date: "2024-03-07"
tags: ["Next.js", "Markdown", "React", "Tutorial"]
coverColor: "#22c55e"
readTime: 6
---

# Comment j'ai créé un système de blog avec Markdown

Aujourd'hui, je vais vous expliquer comment j'ai built mon système de blog. L'idée était d'avoir un blog simple, performant, et facile à gérer sans avoir besoin d'une base de données. La solution ? Les fichiers Markdown !

## Pourquoi Markdown ?

Au départ, j'hésitais entre plusieurs options :
- Utiliser un CMS comme WordPress
- Stocker les articles dans une base de données
- Utiliser des fichiers Markdown

J'ai choisi Markdown pour plusieurs raisons :

1. **Simplicité** : Pas besoin de connaître le HTML
2. **Portabilité** : Les fichiers sont facilement exportables
3. **Versioning** : Je peux suivre les changements avec Git
4. **Performance** : Les pages sont générées statiquement

## Architecture du Système

Voici comment j'ai structuré le projet :

```
blogs-contents/
  ├── introduction-ia.md
  ├── pourquoi-nextjs.md
  └── ...

app/blogs/
  ├── page.tsx
  ├── [slug]/
  │   └── page.tsx
  └── BlogsPageClient.tsx

lib/
  └── blog.ts
```

## Le Frontmatter

Chaque fichier Markdown commence par un frontmatter - des métadonnées au format YAML :

```markdown
---
title: "Mon Super Article"
description: "Une description"
date: "2024-03-07"
---
```

## Le Code de Parsing

La partie la plus interessante est le parsing des fichiers. J'utilise la bibliothèque `gray-matter` pour extraire le frontmatter et le contenu :

```typescript
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'blogs-contents');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      ...data,
      content,
    };
  });
  
  return posts;
}
```

## L'Affichage des Articles

Pour afficher un article, j'utilise `react-markdown` pour convertir le contenu Markdown en éléments React :

```tsx
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ content }) {
  return (
    <article className="blog-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
```

## Routing Dynamique

Next.js permet de créer des routes dynamiques basées sur le slug :

```typescript
// app/blogs/[slug]/page.tsx
export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
```

## Avantages de cette Approche

### Performance
- Les pages sont pré-générées au build
- Temps de chargement ultra-rapides
- Pas de requêtes base de données au runtime

### Sécurité
- Pas de base de données vulnérable aux injections
- Pas de système de gestion à sécuriser
- Les fichiers sont en lecture seule

### Maintenance
- Simplicité de modification
- Possibilité de blogger depuis n'importe quel éditeur
- Sauvegarde facile avec Git

## Améliorations Possibles

Ce que j'aimerais ajouter :

1. **Syntax Highlighting** : Pour le code
2. **Images optimisées** : Traitement automatique des images
3. **Recherche** : Indexation des articles
4. **Tags/Catégories** : Organisation plus poussée

## Conclusion

Ce système de blog est un excellent exemple de la puissance de Next.js combiné au Markdown. C'est simple, performant, et ça répond parfaitement à mes besoins.

Si vous voulez créer votre propre blog, je vous recommande cette approche. C'est un excellent projet pour apprendre le développement web moderne !
