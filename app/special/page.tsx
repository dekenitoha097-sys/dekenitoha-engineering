"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useTranslation } from "@/lib/i18n";
import { Award, ExternalLink, Lock, Eye, EyeOff, CheckCircle, Users, MousePointer, Activity, Globe, Calendar } from "lucide-react";
import "./special-page.css";

// Données des certificats
const certsList = [
  {
    id: 1,
    title: "Développement Web",
    titleEn: "Web Development",
    image: "/courcera-certificats/developpement_web.png",
    link: "https://www.coursera.org/account/accomplishments/verify/KZYXSW93VCLW",
    platform: "Coursera",
    color: "#0070f3",
  },
  {
    id: 2,
    title: "Communication Professionnelle",
    titleEn: "Professional Communication",
    image: "/courcera-certificats/communication.png",
    link: "https://www.coursera.org/account/accomplishments/verify/TXT97Q2TQGNO",
    platform: "Coursera",
    color: "#a855f7",
  },
  {
    id: 3,
    title: "Réseaux & Sécurité Informatique",
    titleEn: "Networking & Cybersecurity",
    image: "/courcera-certificats/network_and_security.png",
    link: "https://www.coursera.org/account/accomplishments/verify/IW89T3BPL73V",
    platform: "Coursera",
    color: "#22c55e",
  },
  {
    id: 4,
    title: "Gestion de Projet",
    titleEn: "Project Management",
    image: "/courcera-certificats/project_management.png",
    link: "https://www.coursera.org/account/accomplishments/verify/IPP6T58ZM2PC",
    platform: "Coursera",
    color: "#f97316",
  },
];

const CORRECT_PASSWORD = "To70ha22@";

interface AnalyticsData {
  visitors: {
    totalVisitors: number;
    totalVisits: number;
    languages: number;
    firstVisit: string | null;
    lastVisit: string | null;
  };
  events: { event_type: string; count: number }[];
  actions: { action_type: string; count: number }[];
  recentVisitors: any[];
}

export default function SpecialPage() {
  const { t, locale } = useTranslation();
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Fetch analytics data when page is unlocked
  useEffect(() => {
    if (isUnlocked && !analyticsData) {
      setLoadingAnalytics(true);
      fetch('/api/special/data')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAnalyticsData(data.data);
          }
        })
        .catch(err => {
          console.error('Failed to fetch analytics:', err);
        })
        .finally(() => {
          setLoadingAnalytics(false);
        });
    }
  }, [isUnlocked, analyticsData]);

  const totalCerts = certsList.length;
  const platforms = [...new Set(certsList.map((c) => c.platform))].length;

  // Get event label in French
  const getEventLabel = (eventType: string) => {
    const labels: Record<string, string> = {
      first_visit: "Première visite",
      cv_download: "Téléchargement CV",
      cv_print: "Impression CV",
      certificate_view: "Vue certificat",
      certificate_click: "Clic certificat",
      project_view: "Vue projet",
      project_click_github: "Clic GitHub",
      project_click_demo: "Clic Démo",
      contact_submit: "Formulaire contact",
      github_visit: "Visite GitHub",
    };
    return labels[eventType] || eventType;
  };

  // Format date
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <main className="portfolio-page special-page">
      <Header />
      
      {!isUnlocked ? (
        <div className="password-gate">
          <div className="password-container">
            <div className="lock-icon">
              <Lock size={48} />
            </div>
            <h1 className="password-title">
              {locale === "fr" ? "Page Spéciale" : "Special Page"}
            </h1>
            <p className="password-description">
              {locale === "fr" 
                ? "Entrez le mot de passe pour accéder à cette page" 
                : "Enter the password to access this page"}
            </p>
            
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder={locale === "fr" ? "Mot de passe" : "Password"}
                  className={`password-input ${error ? "error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {error && (
                <p className="password-error">
                  {locale === "fr" 
                    ? "Mot de passe incorrect" 
                    : "Incorrect password"}
                </p>
              )}
              
              <button type="submit" className="password-submit">
                {locale === "fr" ? "Accéder" : "Access"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="special-content">
          <div className="special-header">
            <div className="special-badge">
              <Award size={24} />
              <span>{locale === "fr" ? "ACCÈS SPÉCIAL" : "SPECIAL ACCESS"}</span>
            </div>
            
            <h1 className="special-title">
              {locale === "fr" ? "Mes" : "My"}{" "}
              <span className="highlight">
                {locale === "fr" ? "Certifications" : "Certifications"}
              </span>
            </h1>
            
            <p className="special-note">
              To70ha22@
            </p>
            
            <div className="special-stats">
              <div className="stat-item">
                <span className="stat-number">{totalCerts}</span>
                <span className="stat-label">
                  {locale === "fr" ? "Certifications" : "Certifications"}
                </span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">{platforms}</span>
                <span className="stat-label">
                  {locale === "fr" ? "Plateformes" : "Platforms"}
                </span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-number">2024</span>
                <span className="stat-label">
                  {locale === "fr" ? "Année" : "Year"}
                </span>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="section-title">
            <Award size={24} />
            <h2>{locale === "fr" ? "Mes Certifications" : "My Certifications"}</h2>
          </div>
          
          <div className="cert-grid">
            {certsList.map((cert) => (
              <div
                key={cert.id}
                className={`cert-card ${expandedId === cert.id ? "expanded" : ""}`}
                onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                style={{ "--accent-color": cert.color } as React.CSSProperties}
              >
                <div className="cert-header">
                  <div className="cert-icon" style={{ backgroundColor: cert.color }}>
                    <Award size={24} />
                  </div>
                  <div className="cert-info">
                    <h3 className="cert-title">
                      {locale === "fr" ? cert.title : cert.titleEn}
                    </h3>
                    <span className="cert-platform">{cert.platform}</span>
                  </div>
                  <CheckCircle 
                    size={24} 
                    className="cert-check"
                    style={{ color: cert.color }}
                  />
                </div>
                
                <div className="cert-preview">
                  <img src={cert.image} alt={cert.title} />
                </div>
                
                {expandedId === cert.id && (
                  <div className="cert-details">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {locale === "fr" ? "Voir le certificat" : "View credential"}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="analytics-section">
            <div className="section-title">
              <Activity size={24} />
              <h2>{locale === "fr" ? "Données du Portfolio" : "Portfolio Data"}</h2>
            </div>
            
            {loadingAnalytics ? (
              <div className="analytics-loading">
                <div className="loading-spinner" />
                <p>{locale === "fr" ? "Chargement des données..." : "Loading data..."}</p>
              </div>
            ) : analyticsData ? (
              <>
                {/* Visitor Stats */}
                <div className="analytics-grid">
                  <div className="analytics-card main-stat">
                    <div className="analytics-icon visitors">
                      <Users size={28} />
                    </div>
                    <div className="analytics-content">
                      <span className="analytics-number">
                        {analyticsData.visitors.totalVisitors || 0}
                      </span>
                      <span className="analytics-label">
                        {locale === "fr" ? "Visiteurs uniques" : "Unique Visitors"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="analytics-card">
                    <div className="analytics-icon visits">
                      <MousePointer size={24} />
                    </div>
                    <div className="analytics-content">
                      <span className="analytics-number">
                        {analyticsData.visitors.totalVisits || 0}
                      </span>
                      <span className="analytics-label">
                        {locale === "fr" ? "Visites totales" : "Total Visits"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="analytics-card">
                    <div className="analytics-icon languages">
                      <Globe size={24} />
                    </div>
                    <div className="analytics-content">
                      <span className="analytics-number">
                        {analyticsData.visitors.languages || 0}
                      </span>
                      <span className="analytics-label">
                        {locale === "fr" ? "Langues" : "Languages"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Events & Actions */}
                <div className="analytics-details">
                  <div className="detail-card">
                    <h3>
                      <Activity size={18} />
                      {locale === "fr" ? "Événements" : "Events"}
                    </h3>
                    <div className="detail-list">
                      {analyticsData.events.length > 0 ? (
                        analyticsData.events.map((event, index) => (
                          <div key={index} className="detail-item">
                            <span className="detail-name">
                              {getEventLabel(event.event_type)}
                            </span>
                            <span className="detail-count">{event.count}</span>
                          </div>
                        ))
                      ) : (
                        <p className="no-data">
                          {locale === "fr" ? "Aucun événement" : "No events"}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="detail-card">
                    <h3>
                      <MousePointer size={18} />
                      {locale === "fr" ? "Actions" : "Actions"}
                    </h3>
                    <div className="detail-list">
                      {analyticsData.actions.length > 0 ? (
                        analyticsData.actions.map((action, index) => (
                          <div key={index} className="detail-item">
                            <span className="detail-name">
                              {getEventLabel(action.action_type)}
                            </span>
                            <span className="detail-count">{action.count}</span>
                          </div>
                        ))
                      ) : (
                        <p className="no-data">
                          {locale === "fr" ? "Aucune action" : "No actions"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="date-range">
                  <Calendar size={16} />
                  <span>
                    {locale === "fr" 
                      ? `Période: ${formatDate(analyticsData.visitors.firstVisit)} - ${formatDate(analyticsData.visitors.lastVisit)}`
                      : `Period: ${formatDate(analyticsData.visitors.firstVisit)} - ${formatDate(analyticsData.visitors.lastVisit)}`
                    }
                  </span>
                </div>
              </>
            ) : (
              <div className="analytics-error">
                <Activity size={48} />
                <h3>{locale === "fr" ? "Base de données non connectée" : "Database not connected"}</h3>
                <p>{locale === "fr" 
                  ? "Pour voir les statistiques, configurez votre base de données MySQL avec les variables d'environnement:"
                  : "To see statistics, configure your MySQL database with environment variables:"}</p>
                <code>DB_HOST, DB_USER, DB_PASSWORD, DB_NAME</code>
                <p className="db-hint">{locale === "fr" 
                  ? "Créez les tables avec le fichier analytics-mysql.sql"
                  : "Create tables using analytics-mysql.sql file"}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
