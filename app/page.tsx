import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SectionIndicator from "@/components/SectionIndicator";

export default function Home() {
  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />
        <Hero />
        <About />
        <Skills />
        <SectionIndicator />
      </div>
    </main>
  );
}