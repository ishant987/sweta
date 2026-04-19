import HeroSequence from "@/components/HeroSequence";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* ── Hero: Scroll-linked Canvas + Pinned Text Overlays ── */}
      <HeroSequence />

      {/* ── Projects Grid (appears only after sequence finishes) ── */}
      <Projects />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
