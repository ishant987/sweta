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

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
