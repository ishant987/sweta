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

  /* ── Hero overlay timing (Left name & Bottom about description) ── */
  // Content is 100% visible at frame 0, stays fully visible through 0.25 scroll, then fades smoothly to 0 by 0.50 so the 3D visualizer plays clearly and overlays are cleanly gone well before the next section arrives
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.50],
    [1, 1, 0]
  );
  const heroNameY = useTransform(scrollYProgress, [0, 0.50], [0, -30]);
  const heroAboutY = useTransform(scrollYProgress, [0, 0.50], [0, -20]);

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

  /* ── Preload images with instant first-frame render ── */
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    // Load first frame immediately to eliminate initial render delay
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (!cancelled) {
        setIsLoaded(true);
        drawFrame(0);
      }
    };
    firstImg.onerror = () => {
      if (!cancelled) {
        setIsLoaded(true);
      }
    };
    images[0] = firstImg;

    // Preload remaining frames in parallel
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;
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
    <div id="hero-container" ref={containerRef} className="relative bg-[#121212] w-full" style={{ height: "350vh" }}>
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
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

        {/* ═══════════════ TEXT OVERLAYS: LEFT NAME & BOTTOM ABOUT ═══════════════ */}

        {/* ── Left Side: Name & Role (Visible immediately on initial page) ── */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroNameY }}
          className="absolute top-20 sm:top-28 md:top-32 lg:top-36 left-4 sm:left-10 md:left-16 lg:left-24 z-10 pointer-events-none max-w-lg pr-4 sm:pr-0"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.5)",
            }}
          >
            Sweta Sah
          </h1>

          <p
            className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium text-slate-100 tracking-wide"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            Data and Operations Analyst
          </p>

          <p
            className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-light text-slate-300 tracking-wide"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            }}
          >
            AI Data Operations &bull; Business Intelligence &bull; Business Analysis
          </p>
        </motion.div>

        {/* ── Bottom: About Myself Description (Full Width Edge-to-Edge) ── */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroAboutY }}
          className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none"
        >
          <div className="w-full bg-[#121212]/92 border-t border-white/15 backdrop-blur-2xl px-4 sm:px-10 md:px-16 lg:px-24 py-2.5 sm:py-3.5 shadow-2xl shadow-black/90">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="truncate">Profile</span>
                <span className="text-white/25">•</span>
                <a
                  href="https://github.com/Sweta-Sah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto hover:text-white transition-colors text-slate-300 font-mono text-[9px] sm:text-[10px] bg-white/10 px-2 py-0.5 rounded flex items-center gap-1 shrink-0"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>@Sweta-Sah</span>
                </a>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 shrink-0">
                <span>Scroll</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blue-400"
                >
                  ↓
                </motion.span>
              </div>
            </div>

            <p className="text-[11px] sm:text-[13px] md:text-sm text-white/95 font-light leading-relaxed">
              Data and Operations Analyst with 3+ years of experience supporting AI-enabled digital transformation initiatives in the US Insurance, Mortgage and Banking domain. Experienced in requirements analysis, business process improvement, UAT, stakeholder collaboration, workflow implementation, and production support.
            </p>

            <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-purple-700 text-white font-semibold shadow-sm">
                  🎓 CGPA: 9.43 / 10
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#0078D4] text-white font-semibold shadow-sm">
                  Microsoft PL-300
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-500 text-slate-950 font-bold shadow-sm">
                  🏆 Codebasics 3rd Prize
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-600 text-white font-semibold shadow-sm">
                  Advanced SQL
                </span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">
                  3+ Yrs Data &amp; AI
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-2.5 text-slate-400 text-xs font-medium">
                <span className="text-blue-400">Power BI</span> &bull;
                <span className="text-emerald-400">SQL</span> &bull;
                <span className="text-emerald-300">Excel</span> &bull;
                <span className="text-amber-400">DAX</span> &bull;
                <span className="text-sky-300">Python</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
