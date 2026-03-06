"use client";

import "./Hero.css";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";

interface SocialItem {
  nameKey: TranslationKey;
  href: string;
  icon: React.ReactNode;
  isExternal?: boolean;
}

const SOCIAL_LINKS: ReadonlyArray<SocialItem> = [
  { nameKey: "social.github", href: "https://github.com/dekenitoha097-sys", isExternal: true, icon: <Github size={18} /> },
  { nameKey: "social.linkedin", href: "https://www.linkedin.com/in/toha-dekeni-9b0599356/", isExternal: true, icon: <Linkedin size={18} /> },
  { nameKey: "social.email", href: "mailto:dekenitoha097@gmail.com", isExternal: true, icon: <Mail size={18} /> },
  { nameKey: "social.cv", href: "/cv", icon: <FileText size={18} /> },
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <p className="eyebrow" aria-hidden="true">{t("hero.greeting")}</p>
        <h1 id="hero-heading" className="hero-title">
          <span>{t("hero.firstName")}</span>
          <span>{t("hero.lastName")}</span>
        </h1>
        <p
          className="hero-description"
          dangerouslySetInnerHTML={{ __html: t("hero.description") }}
        />

        <div className="social-row">
          <span className="social-label" id="social-label">{t("hero.socialLabel")}</span>
          <ul className="social-list" aria-labelledby="social-label">
            {SOCIAL_LINKS.map(({ nameKey, href, isExternal, icon }) => (
              <li key={nameKey as string}>
                <a
                  href={href}
                  className="social-link"
                  aria-label={t(nameKey)}
                  title={t(nameKey)}
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-actions">
          <Link href="/contact" className="btn btn-primary">
            {t("hero.cta.contact")}
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            {t("hero.cta.projects")}
          </Link>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="orbit-wrapper">
          <div className="orbit-ring"></div>

          {[
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", alt: "Git" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", alt: "Python" },
            { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", alt: "C++" },
          ].map((tech, i) => (
            <div
              key={tech.alt as string}
              className="orbit-icon"
              style={{ "--i": i, "--total": 8 } as React.CSSProperties}
            >
              <div className="orbit-icon-inner">
                <img src={tech.src} alt={tech.alt} width={26} height={26} />
              </div>
            </div>
          ))}

          <div className="portrait-frame">
            <Image
              src="/image.png"
              alt="Portrait de DEKENI Toha"
              fill
              sizes="(max-width: 992px) 100vw, 420px"
              className="portrait-image"
              priority
            />
            <span className="status-badge">{t("hero.badge")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
