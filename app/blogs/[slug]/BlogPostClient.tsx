"use client";

import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { BlogPost } from "@/lib/blog";
import { ArrowLeft, Calendar, Clock, Hash } from "lucide-react";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import "./blog-post.css";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const { t, locale } = useTranslation();

  const title = locale === "fr" ? post.title : post.titleEn;

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />

        <article
          className="blog-article"
          style={{ "--post-accent": post.coverColor } as React.CSSProperties}
        >
          {/* Orbs */}
          <div className="ba-orb ba-orb-1" />
          <div className="ba-orb ba-orb-2" />

          {/* Back link */}
          <div className="ba-top-bar">
            <Link href="/blogs" className="ba-back">
              <ArrowLeft size={16} />
              {t("blogsPage.back" as TranslationKey)}
            </Link>
          </div>

          {/* Header */}
          <header className="ba-header">
            <div className="ba-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="ba-tag">
                  <Hash size={11} />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="ba-title">{title}</h1>

            <div className="ba-meta">
              <span className="ba-meta-item">
                <Calendar size={14} />
                {t("blogsPage.publishedOn" as TranslationKey)} {formattedDate}
              </span>
              <span className="ba-meta-divider" />
              <span className="ba-meta-item">
                <Clock size={14} />
                {post.readTime} {t("blog.minRead" as TranslationKey)}
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="ba-prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Bottom nav */}
          <footer className="ba-footer">
            <Link href="/blogs" className="ba-back-btn">
              <ArrowLeft size={16} />
              {t("blogsPage.back" as TranslationKey)}
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
