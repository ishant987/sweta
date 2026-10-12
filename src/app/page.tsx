import HeroSequence from "@/components/HeroSequence";
import Projects from "@/components/Projects";
import CertificationsShowcase from "@/components/CertificationsShowcase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── Hero: Scroll-linked Canvas + Pinned Text Overlays ── */}
      <HeroSequence />

      {/* ── Projects & Career Timeline Grid ── */}
      <Projects />

      {/* ── Verified Certifications & Honors Showcase ── */}
      <CertificationsShowcase />

      {/* ── Codebasics Resume Project Challenge Winners (Full Width) ── */}
      <section className="w-full bg-white border-t border-slate-200/90 overflow-hidden">
        <a
          href="/codebasics-challenge-winners.jpg"
          target="_blank"
          rel="noopener noreferrer"
          title="Click to view full-resolution Winners Announcement"
          className="block w-full cursor-zoom-in"
        >
          <img
            src="/codebasics-challenge-winners.jpg"
            alt="Codebasics Resume Project Challenge #6 Winners — Sweta Sah Ranked 3rd"
            className="w-full h-auto block"
          />
        </a>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
