"use client";

import "./Footer.css";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  Coffee,
  ArrowUpRight,
  ChevronUp,
  Code2,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.skills"), href: "/skills" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.education"), href: "/education" },
    { label: t("nav.certifications"), href: "/certifications" },
  ];

  const resourceLinks = [
    { label: t("footer.resources.blog" as TranslationKey), href: "/blogs" },
    { label: t("footer.resources.cv" as TranslationKey), href: "/cv" },
    {
      label: t("footer.resources.github" as TranslationKey),
      href: "https://github.com/dekenitoha097-sys",
      external: true,
    },
  ];

  const socials = [
    {
      icon: <Github size={18} />,
      label: "GitHub",
      href: "https://github.com/dekenitoha097-sys",
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/toha-dekeni-9b0599356/",
    },
    {
      icon: <Mail size={18} />,
      label: "Email",
      href: "mailto:dekenitoha097@gmail.com",
    },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Top accent line */}
      <div className="ft-accent-line" />

      {/* Back to top */}
      <button
        className="ft-back-to-top"
        onClick={scrollToTop}
        aria-label={t("footer.backToTop" as TranslationKey)}
      >
        <ChevronUp size={18} />
        <span>{t("footer.backToTop" as TranslationKey)}</span>
      </button>

      <div className="ft-container">
        {/* ── Main Grid ── */}
        <div className="ft-grid">
          {/* Brand column */}
          <div className="ft-brand-col">
            <Link href="/" className="ft-brand-logo">
              <span className="ft-brand-icon-dk">DK</span>
              <span className="ft-brand-name">{t("brand")}</span>
            </Link>
            <p className="ft-brand-tagline">
              {t("footer.brand.tagline" as TranslationKey)}
            </p>

            {/* Social links */}
            <div className="ft-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-pill"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="ft-link-col">
            <h3 className="ft-col-title">
              {t("footer.nav.title" as TranslationKey)}
            </h3>
            <ul className="ft-link-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ft-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div className="ft-link-col">
            <h3 className="ft-col-title">
              {t("footer.resources.title" as TranslationKey)}
            </h3>
            <ul className="ft-link-list">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ft-link"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="ft-link-ext" />
                    </a>
                  ) : (
                    <Link href={link.href} className="ft-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="ft-connect-col">
            <h3 className="ft-col-title">
              {t("footer.connect.title" as TranslationKey)}
            </h3>
            <p className="ft-connect-desc">
              {t("footer.connect.description" as TranslationKey)}
            </p>
            <Link href="#contact" className="ft-connect-cta">
              <Sparkles size={14} />
              {t("footer.connect.cta" as TranslationKey)}
            </Link>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-copyright">
            &copy; {new Date().getFullYear()} DEKENI Toha.{" "}
            {t("footer.copyright" as TranslationKey)}
          </p>
          <p className="ft-made-with">
            {t("footer.madeWith" as TranslationKey)}{" "}
            <Heart size={13} className="ft-heart" />{" "}
            {t("footer.and" as TranslationKey)}{" "}
            <Coffee size={13} className="ft-coffee-icon" />
            <span className="ft-tech-badge">
              {t("footer.builtWith" as TranslationKey)}
            </span>
          </p>
        </div>
      </div>

      {/* Background effects */}
      <div className="ft-glow ft-glow-1" />
      <div className="ft-glow ft-glow-2" />
    </footer>
  );
}
