"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CERTIFICATIONS } from "@/data/certifications";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inLightSection, setInLightSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Hero sequence has height 350vh
      if (pathname === "/") {
        const heroEl = document.getElementById("hero-container");
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          setInLightSection(rect.bottom <= 70);
        } else {
          const heroHeightThreshold = window.innerHeight * 2.5;
          setInLightSection(scrollY >= heroHeightThreshold);
        }
      } else {
        setInLightSection(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isLight = pathname !== "/" || inLightSection;

  const navLinks = [
    { label: "Work", href: "/#projects" },
    { label: "Certifications", href: "/#certifications" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isLight
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs text-slate-900"
            : scrolled
            ? "bg-[#121212]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20 text-white"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Brand Name: Appears after hero section is completed */}
          <div className="flex items-center min-w-0">
            <AnimatePresence>
              {isLight && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href="/"
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="group flex items-center gap-2 py-1"
                    title="Back to top"
                  >
                    <span className="font-bold tracking-tight text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      Sweta Sah
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCertActive =
                link.href === "/certifications" && pathname === "/certifications";

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors font-medium tracking-wide flex items-center gap-1.5 ${
                    isLight
                      ? isCertActive
                        ? "text-blue-600 font-bold"
                        : "text-slate-600 hover:text-black"
                      : isCertActive
                      ? "text-white font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.label === "Certifications" && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-blue-600 text-white shadow-2xs">
                      {CERTIFICATIONS.length}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* GitHub button */}
            <a
              href="https://github.com/Sweta-Sah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className={`p-2 rounded-full transition-all flex items-center justify-center ${
                isLight
                  ? "bg-white border border-slate-300 text-slate-700 hover:text-black hover:bg-slate-50 shadow-2xs"
                  : "bg-white/[0.08] border border-white/15 text-white/80 hover:text-white hover:bg-white/[0.15]"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Resume button */}
            <a
              href="/Sweta_Sah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                isLight
                  ? "bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 hover:text-black shadow-2xs"
                  : "bg-white/[0.08] border border-white/15 text-white/90 hover:bg-white/[0.15] hover:text-white"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Academic CV
            </a>

            <a
              href="/#contact"
              className={`text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-xs ${
                isLight
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-950 hover:bg-slate-100 font-bold"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors ${
              isLight ? "text-slate-800" : "text-white/80"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[95] backdrop-blur-2xl flex flex-col items-center justify-center gap-7 px-6 ${
              isLight ? "bg-white/98 text-slate-900" : "bg-[#121212]/98 text-white"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-bold transition-colors flex items-center gap-2 ${
                  isLight
                    ? "text-slate-800 hover:text-indigo-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {link.label === "Certifications" && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-blue-600 text-white shadow-2xs">
                    {CERTIFICATIONS.length}
                  </span>
                )}
              </Link>
            ))}

            <div className="flex flex-col gap-3 w-full max-w-xs pt-6 border-t border-slate-200 mt-4">
              <a
                href="https://github.com/Sweta-Sah"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-3 rounded-full font-medium text-sm border flex items-center justify-center gap-2 ${
                  isLight
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white text-slate-900 font-semibold"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Profile (@Sweta-Sah)</span>
              </a>
              <a
                href="/Sweta_Sah_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-3 rounded-full font-medium text-sm border ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-800"
                    : "bg-white/10 border-white/10 text-white"
                }`}
              >
                Academic CV (PDF)
              </a>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-3 rounded-full font-semibold text-sm ${
                  isLight ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "bg-white text-slate-950 font-bold"
                }`}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
