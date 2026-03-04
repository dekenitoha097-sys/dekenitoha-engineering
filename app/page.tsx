import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <Header />
        <Hero />

        <ul className="section-indicator" aria-hidden="true" role="presentation">
          <li className="is-active">01</li>
          <li>02</li>
          <li>03</li>
          <li>04</li>
        </ul>
      </div>
    </main>
  );
}