"use client";

import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { BlogMeta } from "@/lib/blog";
import { Clock, Calendar, ArrowRight, BookOpen, Hash } from "lucide-react";
import Link from "next/link";
import "./blogs-page.css";

interface Props {
  posts: BlogMeta[];
}

export default function BlogsPageClient({ posts }: Props) {
  const { t, locale } = useTranslation();

  const totalPosts = posts.length;
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        {/* ── Hero ── */}
        <section className="bp-hero">
          <div className="bp-hero-orb bp-orb-1" />
          <div className="bp-hero-orb bp-orb-2" />
          <div className="bp-hero-orb bp-orb-3" />

          <div className="bp-hero-container">
            <span className="eyebrow">
              {t("blogsPage.eyebrow" as TranslationKey)}
            </span>
            <h1 className="bp-hero-title">
              {t("blogsPage.title" as TranslationKey)}{" "}
              <span className="bp-hero-highlight">
                {t("blogsPage.titleHighlight" as TranslationKey)}
              </span>
            </h1>
            <p className="bp-hero-intro">
              {t("blogsPage.intro" as TranslationKey)}
            </p>

            {/* Stats */}
            <div className="bp-stats-row">
              <div className="bp-stat">
                <span className="bp-stat-value">{totalPosts}</span>
                <span className="bp-stat-label">
                  {t("blogsPage.stats.articles" as TranslationKey)}
                </span>
              </div>
              <div className="bp-stat-divider" />
              <div className="bp-stat">
                <span className="bp-stat-value">{allTags.length}</span>
                <span className="bp-stat-label">
                  {t("blogsPage.stats.topics" as TranslationKey)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Articles Grid ── */}
        <div className="bp-grid-section">
          {posts.length === 0 ? (
            <div className="bp-no-articles">
              <BookOpen size={48} />
              <p>{t("blogsPage.noArticles" as TranslationKey)}</p>
            </div>
          ) : (
            <div className="bp-grid">
              {posts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className={`bp-card ${idx === 0 ? "bp-card--featured" : ""}`}
                  style={{
                    animationDelay: `${0.05 + idx * 0.08}s`,
                    "--blog-accent": post.coverColor,
                  } as React.CSSProperties}
                >
                  {/* Accent */}
                  <div className="bp-card-accent" />

                  <div className="bp-card-body">
                    {/* Tags */}
                    <div className="bp-card-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bp-tag">
                          <Hash size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="bp-card-title">
                      {locale === "fr" ? post.title : post.titleEn}
                    </h2>

                    {/* Excerpt */}
                    <p className="bp-card-excerpt">
                      {locale === "fr" ? post.excerpt : post.excerptEn}
                    </p>

                    {/* Spacer */}
                    <div className="bp-card-spacer" />

                    {/* Footer */}
                    <div className="bp-card-footer">
                      <div className="bp-card-meta">
                        <span className="bp-card-date">
                          <Calendar size={13} />
                          {formatDate(post.date)}
                        </span>
                        <span className="bp-card-read">
                          <Clock size={13} />
                          {post.readTime} {t("blog.minRead" as TranslationKey)}
                        </span>
                      </div>
                      <span className="bp-card-cta">
                        {t("blog.readMore" as TranslationKey)}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
