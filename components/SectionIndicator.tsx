"use client";

import "./SectionIndicator.css";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicator() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="section-indicator" aria-label="Section navigation">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`indicator-dot ${activeId === id ? "is-active" : ""}`}
          onClick={() => handleClick(id)}
          aria-label={label}
          title={label}
        >
          <span className="dot"></span>
          <span className="indicator-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
