"use client";

import "./Blog.css";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { BlogMeta } from "@/lib/blog";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface Props {
  posts: BlogMeta[];
}

export default function BlogSectionClient({ posts }: Props) {
  const { t, locale } = useTranslation();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-heading">
      <div className="blog-bg-glow blog-glow-1" />
      <div className="blog-bg-glow blog-glow-2" />

      <div className="blog-container">
        <header className="blog-header">
          <span className="eyebrow">
            {t("blog.eyebrow" as TranslationKey)}
          </span>
          <h2 id="blog-heading" className="blog-title">
            {t("blog.title" as TranslationKey)}{" "}
            <span className="blog-title-highlight">
              {t("blog.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="blog-description">
            {t("blog.description" as TranslationKey)}
          </p>
        </header>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="blog-card"
              style={{
                animationDelay: `${0.15 + i * 0.12}s`,
                "--blog-accent": post.coverColor,
              } as React.CSSProperties}
            >
              {/* Color bar */}
              <div className="blog-card-bar" />

              <div className="blog-card-body">
                {/* Tags */}
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="blog-card-title">
                  {locale === "fr" ? post.title : post.titleEn}
                </h3>

                {/* Excerpt */}
                <p className="blog-card-excerpt">
                  {locale === "fr" ? post.excerpt : post.excerptEn}
                </p>

                {/* Meta */}
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    <Calendar size={13} />
                    {formatDate(post.date)}
                  </span>
                  <span className="blog-card-read">
                    <Clock size={13} />
                    {post.readTime} {t("blog.minRead" as TranslationKey)}
                  </span>
                </div>

                {/* Read more */}
                <span className="blog-card-cta">
                  {t("blog.readMore" as TranslationKey)}
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="blog-cta-wrapper">
          <Link href="/blogs" className="btn btn-ghost blog-cta">
            {t("blog.seeMore" as TranslationKey)}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
