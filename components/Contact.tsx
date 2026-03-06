"use client";

import "./Contact.css";
import { useTranslation } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/translations";
import { useState, useRef } from "react";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  Github,
  Linkedin,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  User,
  AtSign,
  MessageSquare,
  FileText,
} from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormFeedback {
  title: string;
  detail?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");

      setStatus("success");
      setFeedback({
        title: data?.message ?? t("contact.form.success" as TranslationKey),
        detail: data?.detail,
      });
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setFeedback({
        title:
          error instanceof Error && error.message
            ? error.message
            : t("contact.form.error" as TranslationKey),
        detail: "Merci de verifier votre connexion et de reessayer.",
      });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const infoItems = [
    {
      icon: <Mail size={18} />,
      label: t("contact.info.email" as TranslationKey),
      value: "dekenitoha097@gmail.com",
      href: "mailto:dekenitoha097@gmail.com",
    },
    {
      icon: <MapPin size={18} />,
      label: t("contact.info.location" as TranslationKey),
      value: t("contact.info.locationValue" as TranslationKey),
    },
    {
      icon: <Briefcase size={18} />,
      label: t("contact.info.availability" as TranslationKey),
      value: t("contact.info.availabilityValue" as TranslationKey),
    },
    {
      icon: <Clock size={18} />,
      label: t("contact.info.response" as TranslationKey),
      value: t("contact.info.responseValue" as TranslationKey),
    },
  ];

  const socials = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/dekenitoha097-sys",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/toha-dekeni-9b0599356/",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:dekenitoha097@gmail.com",
    },
  ];

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Background effects */}
      <div className="ct-glow ct-glow-1" />
      <div className="ct-glow ct-glow-2" />
      <div className="ct-glow ct-glow-3" />

      <div className="ct-container">
        {/* Header */}
        <header className="ct-header">
          <span className="eyebrow">
            {t("contact.eyebrow" as TranslationKey)}
          </span>
          <h2 id="contact-heading" className="ct-title">
            {t("contact.title" as TranslationKey)}{" "}
            <span className="ct-title-highlight">
              {t("contact.titleHighlight" as TranslationKey)}
            </span>
          </h2>
          <p className="ct-description">
            {t("contact.description" as TranslationKey)}
          </p>
        </header>

        {/* Main layout: form + info */}
        <div className="ct-grid">
          {/* ── Form Card ── */}
          <div className="ct-form-card">
            <div className="ct-form-card-glow" />
            <form ref={formRef} onSubmit={handleSubmit} className="ct-form">
              {/* Name */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-name">
                  <User size={14} />
                  {t("contact.form.name" as TranslationKey)}
                </label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("contact.form.namePlaceholder" as TranslationKey)}
                  className="ct-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Email */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-email">
                  <AtSign size={14} />
                  {t("contact.form.email" as TranslationKey)}
                </label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("contact.form.emailPlaceholder" as TranslationKey)}
                  className="ct-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Subject */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-subject">
                  <FileText size={14} />
                  {t("contact.form.subject" as TranslationKey)}
                </label>
                <input
                  id="ct-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder={t("contact.form.subjectPlaceholder" as TranslationKey)}
                  className="ct-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Message */}
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-message">
                  <MessageSquare size={14} />
                  {t("contact.form.message" as TranslationKey)}
                </label>
                <textarea
                  id="ct-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t("contact.form.messagePlaceholder" as TranslationKey)}
                  className="ct-input ct-textarea"
                  disabled={status === "sending"}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`ct-submit ${status === "sending" ? "ct-submit--loading" : ""}`}
                disabled={status === "sending"}
              >
                <span className="ct-submit-content">
                  {status === "sending" ? (
                    <>
                      <span className="ct-spinner" />
                      {t("contact.form.sending" as TranslationKey)}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t("contact.form.send" as TranslationKey)}
                    </>
                  )}
                </span>
                <div className="ct-submit-shine" />
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="ct-status ct-status--success">
                  <CheckCircle size={16} />
                  <div className="ct-status-content">
                    <p className="ct-status-title">
                      {feedback?.title ?? t("contact.form.success" as TranslationKey)}
                    </p>
                    {feedback?.detail && (
                      <p className="ct-status-detail">{feedback.detail}</p>
                    )}
                  </div>
                </div>
              )}
              {status === "error" && (
                <div className="ct-status ct-status--error">
                  <AlertCircle size={16} />
                  <div className="ct-status-content">
                    <p className="ct-status-title">
                      {feedback?.title ?? t("contact.form.error" as TranslationKey)}
                    </p>
                    {feedback?.detail && (
                      <p className="ct-status-detail">{feedback.detail}</p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* ── Info Side ── */}
          <div className="ct-info-side">
            {/* Info cards */}
            <div className="ct-info-grid">
              {infoItems.map((item) => (
                <div key={item.label} className="ct-info-card">
                  <div className="ct-info-icon">{item.icon}</div>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="ct-info-value ct-info-link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="ct-info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="ct-social-card">
              <h3 className="ct-social-title">
                {t("contact.social.title" as TranslationKey)}
              </h3>
              <div className="ct-social-links">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-social-link"
                    aria-label={s.label}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                    <ArrowUpRight size={14} className="ct-social-arrow" />
                  </a>
                ))}
              </div>
            </div>

            {/* Coffee CTA */}
            <div className="ct-coffee">
              <p>{t("contact.cta.coffee" as TranslationKey)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
