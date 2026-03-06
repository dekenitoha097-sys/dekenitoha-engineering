import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionIndicator from "@/components/SectionIndicator";

export default function Home() {
  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Blog />
        <Contact />
        <Footer />
        <SectionIndicator />
      </div>
    </main>
  );
}
