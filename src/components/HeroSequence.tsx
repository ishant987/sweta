"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const FRAME_COUNT = 120;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/sequence/frame_${padded}_delay-0.066s.webp`;
}

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  /* ── Text overlay timing ── */

  // Section 1: Name — appears early (10%–30%), centered on face
  const opacity1 = useTransform(
    scrollYProgress,
    [0.08, 0.13, 0.25, 0.30],
    [0, 1, 1, 0]
  );
  const y1 = useTransform(scrollYProgress, [0.08, 0.30], [30, -30]);
  const scale1 = useTransform(scrollYProgress, [0.08, 0.15], [0.92, 1]);

  // Section 2: "5+ Years Experience" — left aligned (30%–50%)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.28, 0.33, 0.45, 0.50],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(scrollYProgress, [0.28, 0.50], [50, -30]);

  // Section 3: "Innovating with AI" — right aligned (50%–70%)
  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.53, 0.65, 0.70],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(scrollYProgress, [0.48, 0.70], [50, -30]);

  // Section 4: "Let's build together" — center (72%–90%)
  const opacity4 = useTransform(
    scrollYProgress,
    [0.70, 0.75, 0.88, 0.95],
    [0, 1, 1, 0]
  );
  const y4 = useTransform(scrollYProgress, [0.70, 0.95], [40, -20]);

  // Scroll indicator — only at very start
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.08],
    [1, 1, 0]
  );

  // Bottom fade-to-dark gradient (intensifies near end to blend into next section)
  const bottomFadeOpacity = useTransform(
    scrollYProgress,
    [0.80, 1.0],
    [0, 1]
  );

  /* ── Canvas drawing with cover-fit ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  /* ── Preload images ── */
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT && !cancelled) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT && !cancelled) {
          setIsLoaded(true);
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
    return () => { cancelled = true; };
  }, [drawFrame]);

  /* ── Resize canvas ── */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  /* ── Scrub frames on scroll ── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(idx));
    }
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#121212" }}
        />

        {/* Loading */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-[#121212]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-white/10 border-t-[#a78bfa] rounded-full animate-spin" />
              <span className="text-sm text-white/40 font-medium tracking-wider uppercase">
                Loading experience…
              </span>
            </div>
          </div>
        )}

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(18,18,18,0.55) 100%)",
          }}
        />

        {/* ═══════════════ TEXT OVERLAYS ═══════════════ */}

        {/* Scroll indicator at very start */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Section 1: Name — centered over the face */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 4px 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.3)",
            }}
          >
            Sweta
          </h1>
          <p
            className="mt-3 text-base md:text-lg font-light tracking-[0.15em] uppercase"
            style={{
              color: "rgba(255,255,255,0.45)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Data Analyst
          </p>
        </motion.div>

        {/* Section 2: "5+ Years Experience" — left aligned */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-end items-start pb-[15vh] pl-8 md:pl-16 lg:pl-24 z-10 pointer-events-none"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            2+ Years
            <br />
            Experience.
          </h2>
          <p
            className="mt-4 text-sm md:text-base font-light max-w-md leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.45)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Specializing in Data Extraction, SQL, and
            <br />
            Power BI.
          </p>
        </motion.div>

        {/* Section 3: "Innovating with AI" — right aligned */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col justify-end items-end pb-[15vh] pr-8 md:pr-16 lg:pr-24 text-right z-10 pointer-events-none"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            Data
            <br />
            Operations.
          </h2>
          <p
            className="mt-4 text-sm md:text-base font-light max-w-md leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.45)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Ensuring Data Quality &amp; Automation
            <br />
            Efficiency.
          </p>
        </motion.div>

        {/* Section 4: "Let's build" — center */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
            style={{
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 4px 40px rgba(0,0,0,0.7)",
            }}
          >
            Let&apos;s build the future.
          </h2>
          <p
            className="mt-4 text-sm md:text-base font-light"
            style={{
              color: "rgba(255,255,255,0.4)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Scroll down to see my work ↓
          </p>
        </motion.div>

        {/* Bottom fade to #121212 (for seamless transition to next section) */}
        <motion.div
          style={{ opacity: bottomFadeOpacity }}
          className="absolute bottom-0 left-0 right-0 h-[40vh] z-[6] pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#121212]" />
        </motion.div>
      </div>
    </div>
  );
}
