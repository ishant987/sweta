"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Opacity curves for each section ── */
  // Section 1: Hero (visible 0%–20%, fades out by 25%)
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.02, 0.18, 0.25],
    [0, 1, 1, 0]
  );
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -120]);

  // Section 2: "I build digital experiences" (fades in 25%, visible to 45%, out by 50%)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.43, 0.50],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(scrollYProgress, [0.22, 0.50], [80, -80]);

  // Section 3: "Bridging design & engineering" (fades in 50%, visible to 70%, out by 75%)
  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.54, 0.68, 0.75],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(scrollYProgress, [0.48, 0.75], [80, -80]);

  // Section 4: CTA "See the work ↓" (fades in 75%, stays till 100%)
  const opacity4 = useTransform(
    scrollYProgress,
    [0.73, 0.80, 0.95, 1.0],
    [0, 1, 1, 0]
  );
  const y4 = useTransform(scrollYProgress, [0.73, 1.0], [60, -40]);

  // Scroll indicator — only visible at the very start
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.10],
    [0, 1, 0]
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ height: "500vh" }}
    >
      {/* Single sticky layer that stays pinned the entire scroll */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Section 1: Hero Title ── */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]">
            <span className="block text-white/90">Ishant</span>
            <span className="block text-gradient mt-1 md:mt-3">
              Creative Developer
            </span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-white/40 max-w-md font-light tracking-wide">
            Crafting immersive digital experiences
            <br />
            at the intersection of design &amp; code
          </p>
        </motion.div>

        {/* ── Scroll indicator (only at start) ── */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-xs uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
        </motion.div>

        {/* ── Section 2: Statement Left ── */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-center items-start text-left pl-8 md:pl-20 lg:pl-32 px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            <span className="text-white/80">I build</span>
            <br />
            <span className="text-gradient-warm">digital experiences</span>
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-white/35 max-w-sm font-light leading-relaxed">
            From concept to deployment — performant, accessible,
            <br />
            and beautifully crafted for the modern web.
          </p>
        </motion.div>

        {/* ── Section 3: Statement Right ── */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col justify-center items-end text-right pr-8 md:pr-20 lg:pr-32 px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            <span className="text-white/80">Bridging</span>
            <br />
            <span className="text-gradient">design &amp; engineering</span>
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-white/35 max-w-sm font-light leading-relaxed">
            Pixel-perfect UI meets robust architecture.
            <br />
            Every interaction tells a story.
          </p>
        </motion.div>

        {/* ── Section 4: CTA ── */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white/90">
            See the work ↓
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/30 font-light">
            Selected projects &amp; case studies
          </p>
        </motion.div>
      </div>
    </div>
  );
}
