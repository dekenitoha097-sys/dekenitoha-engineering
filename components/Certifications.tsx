"use client";

import "./Certifications.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { trackCertificateView } from "@/lib/analytics";
import { Award, ArrowRight, ExternalLink } from "lucide-react";

const certsList = [
  { id: 1, image: "/courcera-certificats/developpement_web.png", link: "https://www.coursera.org/account/accomplishments/verify/KZYXSW93VCLW" },
  { id: 2, image: "/courcera-certificats/communication.png", link: "https://www.coursera.org/account/accomplishments/verify/TXT97Q2TQGNO" },
  { id: 3, image: "/courcera-certificats/network_and_security.png", link: "https://www.coursera.org/account/accomplishments/verify/IW89T3BPL73V" },
  { id: 4, image: "/courcera-certificats/project_management.png", link: "https://www.coursera.org/account/accomplishments/verify/IPP6T58ZM2PC" },
  { id: 5, image: "/courcera-certificats/javascript_cisco.png", link: "/courcera-certificats/javascript_cisco.png" },
];

// Montre 3 sur la homepage
const HOMEPAGE_COUNT = 3;

export default function Certifications() {
  const { t } = useTranslation();
  const featured = certsList.slice(0, HOMEPAGE_COUNT);

  return (
    <section className="certifications" id="certifications" aria-labelledby="certifications-heading">
      <div className="cert-bg-glow cert-glow-1" />
      <div className="cert-bg-glow cert-glow-2" />

      <div className="cert-container">
        <header className="cert-header">
          <span className="eyebrow">
            {t("certifications.eyebrow" as TranslationKey)}
          </span>
          <h2 id="certifications-heading" className="cert-title">
            {t("certifications.title" as TranslationKey)}{" "}
            <span className="cert-title-highlight">
              {t("certifications.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="cert-description">
            {t("certifications.description" as TranslationKey)}
          </p>
        </header>

        <div className="cert-grid">
          {featured.map((cert, i) => (
            <article
              key={cert.id}
              className="cert-card"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="cert-card-image-wrap">
                <img
                  src={cert.image}
                  alt={t(`cert.${cert.id}.title` as TranslationKey)}
                  className="cert-card-image"
                />
                <div className="cert-card-overlay">
                  <Award size={28} />
                </div>
              </div>
              <div className="cert-card-body">
                <div className="cert-card-issuer-row">
                  <span className="cert-card-issuer">
                    {t(`cert.${cert.id}.issuer` as TranslationKey)}
                  </span>
                  <span className="cert-card-date">
                    {t(`cert.${cert.id}.date` as TranslationKey)}
                  </span>
                </div>
                <h3 className="cert-card-title">
                  {t(`cert.${cert.id}.title` as TranslationKey)}
                </h3>
                <p className="cert-card-desc">
                  {t(`cert.${cert.id}.desc` as TranslationKey)}
                </p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card-link"
                  onClick={() => trackCertificateView(cert.id.toString())}
                >
                  <ExternalLink size={14} />
                  {t("certificationsPage.viewCredential" as TranslationKey)}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="cert-cta-wrapper">
          <Link href="/certifications" className="btn btn-ghost cert-cta">
            {t("certifications.seeMore" as TranslationKey)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { certsList };
