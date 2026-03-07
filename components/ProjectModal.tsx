"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

interface ProjectDetail {
  id: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  featuresFr?: string[];
  featuresEn?: string[];
  resultsFr?: string[];
  resultsEn?: string[];
  techs: string[];
  images?: string[];
  image?: string;
  github?: string;
  demo?: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
  locale: "fr" | "en";
}

export default function ProjectModal({ project, isOpen, onClose, locale }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const projectImages = project.images ?? [];
  const images = projectImages.map(img => img.startsWith('/projects/') ? img : `/projects/${img}`);
  const hasMultipleImages = images.length > 1;

  const features = locale === "fr" ? project.featuresFr : project.featuresEn;
  const results = locale === "fr" ? project.resultsFr : project.resultsEn;

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Image Gallery */}
        <div className="project-modal-gallery">
          <div className="project-modal-image-container">
            <img
              src={images[currentImageIndex]}
              alt={`${locale === "fr" ? project.titleFr : project.titleEn} - Image ${currentImageIndex + 1}`}
              className="project-modal-image"
            />
          </div>
          
          {hasMultipleImages && (
            <>
              <button className="project-modal-nav project-modal-nav--prev" onClick={goToPreviousImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="project-modal-nav project-modal-nav--next" onClick={goToNextImage}>
                <ChevronRight size={24} />
              </button>
              <div className="project-modal-dots">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`project-modal-dot ${idx === currentImageIndex ? "project-modal-dot--active" : ""}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="project-modal-body">
          <h2 className="project-modal-title">
            {locale === "fr" ? project.titleFr : project.titleEn}
          </h2>

          <p className="project-modal-desc">
            {locale === "fr" ? project.descFr : project.descEn}
          </p>

          {/* Tech Stack */}
          <div className="project-modal-techs">
            {project.techs.map((tech) => (
              <span key={tech} className="project-modal-tech">{tech}</span>
            ))}
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="project-modal-section">
              <h3 className="project-modal-section-title">
                {locale === "fr" ? "Fonctionnalités clés" : "Key Features"}
              </h3>
              <ul className="project-modal-list">
                {features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {results && results.length > 0 && (
            <div className="project-modal-section">
              <h3 className="project-modal-section-title">
                {locale === "fr" ? "Résultats observés" : "Results Achieved"}
              </h3>
              <ul className="project-modal-list">
                {results.map((result, idx) => (
                  <li key={idx}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="project-modal-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-modal-action project-modal-action--github">
                <Github size={18} />
                <span>{locale === "fr" ? "Voir le code" : "View Code"}</span>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-modal-action project-modal-action--demo">
                <ExternalLink size={18} />
                <span>{locale === "fr" ? "Voir la démo" : "View Demo"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
