"use client";

import { useState, useEffect } from "react";
import "./Header.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navigation = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.education"), href: "/education" },
    { label: t("nav.skills"), href: "/skills" },
    { label: t("nav.projects"), href: "/projects" },
    {label:t("nav.certifications"), href: "/certifications"},
    { label: t("nav.blog"), href: "/blogs" },
    {label: t("nav.cv"), href: "/cv" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="site-header fixed" role="banner">
      <Link href="/" className="brand text-red-300 font-[var(--font-caveat)]" aria-label="Retour à l'accueil">
        {t("brand")}
      </Link>

      <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Navigation principale">
        {navigation.map(({ label, href }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={`nav-link ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
        {/* Mobile-only actions inside nav */}
        <div className="mobile-nav-actions">
          <LanguageSwitcher />
          <Link href="#contact" className="cta-pill" onClick={() => setMenuOpen(false)}>
            {t("nav.cta")}
          </Link>
        </div>
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <Link href="#contact" className="cta-pill">
          {t("nav.cta")}
        </Link>
      </div>

      <button
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
