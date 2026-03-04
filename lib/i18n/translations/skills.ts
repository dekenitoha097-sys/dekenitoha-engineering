// 🛠️ Traductions : Skills Section (homepage) + Skills Page

const skills = {
  fr: {
    // Skills Section (homepage)
    "skills.eyebrow": "COMPÉTENCES",
    "skills.title": "Mes",
    "skills.titleHighlight": "Compétences",
    "skills.description":
      "Un socle technique solide, forgé par la pratique et la rigueur académique, couvrant l'ensemble du cycle de développement logiciel.",
    "skills.seeMore": "Voir toutes mes compétences",
    "skills.cat.software": "Ingénierie Logicielle",
    "skills.cat.web": "Développement Web",
    "skills.cat.ai": "IA & Data",
    "skills.cat.db": "Bases de Données",
    "skills.cat.tools": "Outils & Environnement",

    // Skills Page (detailed)
    "skillsPage.eyebrow": "COMPÉTENCES TECHNIQUES",
    "skillsPage.title": "Mon Arsenal",
    "skillsPage.titleHighlight": "Technique",
    "skillsPage.intro":
      "Futur ingénieur en informatique, je développe un profil polyvalent ancré dans la pratique. Chaque technologie maîtrisée est le fruit de projets concrets, de défis relevés et d'une curiosité constante.",
    "skillsPage.level.advanced": "Avancé",
    "skillsPage.level.intermediate": "Intermédiaire",
    "skillsPage.level.fundamentals": "Fondamentaux solides",
    "skillsPage.filter.all": "Tout",

    "skillsPage.software.title": "Ingénierie Logicielle",
    "skillsPage.software.c.desc": "Programmation système, gestion mémoire et structures de données bas niveau.",
    "skillsPage.software.cpp.desc": "Programmation orientée objet, abstractions et performance.",
    "skillsPage.software.python.desc": "Scripting, automatisation, prototypage rapide et data science.",
    "skillsPage.software.ts.desc": "Typage statique appliqué au développement full stack moderne.",
    "skillsPage.software.rust.desc": "Sécurité mémoire et concurrence sans compromis sur la performance.",
    "skillsPage.software.algo.desc": "Conception algorithmique, complexité et optimisation.",

    "skillsPage.web.title": "Développement Web",
    "skillsPage.web.react.desc": "Architecture en composants, hooks, gestion d'état et rendu performant.",
    "skillsPage.web.next.desc": "SSR, SSG, API Routes et optimisation de performance.",
    "skillsPage.web.node.desc": "APIs RESTful, middleware et architecture serveur.",
    "skillsPage.web.tailwind.desc": "Design system utility-first pour des interfaces cohérentes.",
    "skillsPage.web.html.desc": "Sémantique, accessibilité et standards W3C.",
    "skillsPage.web.css.desc": "Animations, layouts complexes et responsive design.",

    "skillsPage.ai.title": "Intelligence Artificielle & Data",
    "skillsPage.ai.tf.desc": "Conception et entraînement de modèles de deep learning.",
    "skillsPage.ai.ml.desc": "Algorithmes de classification, régression et clustering.",
    "skillsPage.ai.data.desc": "Nettoyage, transformation et visualisation de données.",

    "skillsPage.db.title": "Bases de Données",
    "skillsPage.db.pg.desc": "Modélisation relationnelle, requêtes complexes et optimisation.",
    "skillsPage.db.prisma.desc": "ORM type-safe pour une intégration fluide avec TypeScript.",
    "skillsPage.db.sql.desc": "Maîtrise du langage SQL et conception de schémas normalisés.",

    "skillsPage.tools.title": "Outils & Environnement",
    "skillsPage.tools.git.desc": "Gestion de versions, branches, pull requests et CI/CD.",
    "skillsPage.tools.docker.desc": "Conteneurisation et environnements de développement reproductibles.",
    "skillsPage.tools.linux.desc": "Administration système, scripting shell et gestion de serveurs.",
    "skillsPage.tools.vscode.desc": "Configuration avancée, extensions et workflows optimisés.",
    "skillsPage.tools.figma.desc": "Prototypage UI/UX et collaboration design-développement.",
  },
  en: {
    // Skills Section (homepage)
    "skills.eyebrow": "SKILLS",
    "skills.title": "My",
    "skills.titleHighlight": "Skills",
    "skills.description":
      "A solid technical foundation, forged through practice and academic rigor, covering the entire software development lifecycle.",
    "skills.seeMore": "View all my skills",
    "skills.cat.software": "Software Engineering",
    "skills.cat.web": "Web Development",
    "skills.cat.ai": "AI & Data",
    "skills.cat.db": "Databases",
    "skills.cat.tools": "Tools & Environment",

    // Skills Page (detailed)
    "skillsPage.eyebrow": "TECHNICAL SKILLS",
    "skillsPage.title": "My Technical",
    "skillsPage.titleHighlight": "Arsenal",
    "skillsPage.intro":
      "As a future computer science engineer, I develop a versatile profile rooted in practice. Every technology mastered is the result of real projects, challenges overcome, and constant curiosity.",
    "skillsPage.level.advanced": "Advanced",
    "skillsPage.level.intermediate": "Intermediate",
    "skillsPage.level.fundamentals": "Solid Fundamentals",
    "skillsPage.filter.all": "All",

    "skillsPage.software.title": "Software Engineering",
    "skillsPage.software.c.desc": "System programming, memory management and low-level data structures.",
    "skillsPage.software.cpp.desc": "Object-oriented programming, abstractions and performance.",
    "skillsPage.software.python.desc": "Scripting, automation, rapid prototyping and data science.",
    "skillsPage.software.ts.desc": "Static typing applied to modern full stack development.",
    "skillsPage.software.rust.desc": "Memory safety and concurrency without compromising performance.",
    "skillsPage.software.algo.desc": "Algorithm design, complexity analysis and optimization.",

    "skillsPage.web.title": "Web Development",
    "skillsPage.web.react.desc": "Component architecture, hooks, state management and performant rendering.",
    "skillsPage.web.next.desc": "SSR, SSG, API Routes and performance optimization.",
    "skillsPage.web.node.desc": "RESTful APIs, middleware and server architecture.",
    "skillsPage.web.tailwind.desc": "Utility-first design system for consistent interfaces.",
    "skillsPage.web.html.desc": "Semantics, accessibility and W3C standards.",
    "skillsPage.web.css.desc": "Animations, complex layouts and responsive design.",

    "skillsPage.ai.title": "Artificial Intelligence & Data",
    "skillsPage.ai.tf.desc": "Designing and training deep learning models.",
    "skillsPage.ai.ml.desc": "Classification, regression and clustering algorithms.",
    "skillsPage.ai.data.desc": "Data cleaning, transformation and visualization.",

    "skillsPage.db.title": "Databases",
    "skillsPage.db.pg.desc": "Relational modeling, complex queries and optimization.",
    "skillsPage.db.prisma.desc": "Type-safe ORM for seamless TypeScript integration.",
    "skillsPage.db.sql.desc": "SQL mastery and normalized schema design.",

    "skillsPage.tools.title": "Tools & Environment",
    "skillsPage.tools.git.desc": "Version control, branches, pull requests and CI/CD.",
    "skillsPage.tools.docker.desc": "Containerization and reproducible dev environments.",
    "skillsPage.tools.linux.desc": "System administration, shell scripting and server management.",
    "skillsPage.tools.vscode.desc": "Advanced configuration, extensions and optimized workflows.",
    "skillsPage.tools.figma.desc": "UI/UX prototyping and design-development collaboration.",
  },
} as const;

export default skills;
