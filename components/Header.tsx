"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();

  const navigation = [
    { label: t("nav.about"), href: "#about", isActive: true },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#portfolio" },
    { label: t("nav.blog"), href: "#blog" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="site-header fixed" role="banner">
      <Link href="/" className="brand text-red-300 font-[var(--font-caveat)]" aria-label="Retour à l'accueil">
        {t("brand")}
      </Link>

      <nav className="main-nav" aria-label="Navigation principale">
        {navigation.map(({ label, href, isActive }) => (
          <Link
            key={label}
            href={href}
            className={`nav-link ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <LanguageSwitcher />
        <Link href="#contact" className="cta-pill">
          {t("nav.cta")}
        </Link>
      </div>
    </header>
  );
}
