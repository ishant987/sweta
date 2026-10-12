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
          className="absolute top-24 sm:top-28 md:top-32 lg:top-36 left-6 sm:left-10 md:left-16 lg:left-24 z-10 pointer-events-none max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-200 backdrop-blur-md mb-2.5 sm:mb-3 shadow-lg shadow-blue-950/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-blue-200">
              Data Analyst &bull; 3+ Years Experience
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.5)",
            }}
          >
            Sweta Sah
          </h1>

          <p
            className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base font-light text-slate-300 tracking-wide"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            }}
          >
            Business Intelligence &bull; Power BI &bull; SQL Analytics
          </p>
        </motion.div>

        {/* ── Bottom: About Myself Description (Full Width Edge-to-Edge) ── */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroAboutY }}
          className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none"
        >
          <div className="w-full bg-[#121212]/90 border-t border-white/15 backdrop-blur-2xl px-6 sm:px-10 md:px-16 lg:px-24 py-3 sm:py-3.5 shadow-2xl shadow-black/90">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>About Myself</span>
                <span className="text-white/25">•</span>
                <span className="text-slate-300 font-normal">Kolkata, India</span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400">
                <span>Scroll to explore</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blue-400"
                >
                  ↓
                </motion.span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] md:text-sm text-white/95 font-light leading-relaxed">
              Data Analyst &amp; Business Intelligence Specialist with 3+ years of experience transforming complex, multi-million record datasets into strategic executive insights. Microsoft Certified Power BI Data Analyst (PL-300) and 3rd Prize Winner in the Codebasics Challenge, specializing in advanced SQL querying, data modeling, and end-to-end business reporting.
            </p>

            <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-[#0078D4] text-white font-semibold shadow-sm">
                  Microsoft Certified (PL-300)
                </span>
                <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold shadow-sm">
                  🏆 Codebasics 3rd Prize Winner
                </span>
                <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-emerald-600 text-white font-semibold shadow-sm">
                  SQL 1.5M+ Records
                </span>
                <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-indigo-600 text-white font-semibold shadow-sm">
                  3+ Years Exp
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
