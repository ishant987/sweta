"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { CERTIFICATIONS, Certification } from "@/data/certifications";
import CertificateModal from "@/components/CertificateModal";

export default function CertificationsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const selectedCert =
    selectedCertIndex !== null ? CERTIFICATIONS[selectedCertIndex] : null;

  const handleNext = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((selectedCertIndex + 1) % CERTIFICATIONS.length);
    }
  };

  const handlePrev = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex(
        (selectedCertIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length
      );
    }
  };

  return (
    <section
      id="certifications"
      className="relative py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden bg-[#f8fafc] text-slate-900 border-t border-slate-200/80"
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-xs uppercase tracking-[0.2em] text-blue-700 font-mono font-bold">
                Accreditations &amp; Honors
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
              Professional Certifications
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl font-light leading-relaxed">
              Demonstrated expertise across Microsoft Power BI, enterprise SQL querying, and competitive analytics challenges — backed by verifiable industry credentials.
            </p>
          </motion.div>

          {/* Quick link to dedicated page */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm font-semibold shadow-md shadow-blue-500/25 group"
            >
              <span>View All {CERTIFICATIONS.length} Credentials</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Professional Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-blue-600 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">{CERTIFICATIONS.length}</div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">Verified Credentials</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-sky-600 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-sky-600">PL-300</div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">Microsoft Associate</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-amber-500 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">3rd Prize</div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">Codebasics Challenge</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 border-t-4 border-t-emerald-600 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">&gt;70%</div>
            <div className="text-xs text-slate-600 mt-1 font-semibold">SQL Final Exam Score</div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => setSelectedCertIndex(index)}
              className="card-light rounded-2xl overflow-hidden cursor-pointer group relative flex flex-col justify-between bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-lg transition-all"
              style={{ borderTop: `4px solid ${cert.badgeColor}` }}
            >
              {/* Card top banner / Image preview */}
              <div className="relative aspect-[16/11] bg-slate-100 p-3 overflow-hidden border-b border-slate-200/70">
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-200 group-hover:border-slate-400 transition-all bg-white shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-xs text-white font-medium px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-sm shadow-md">
                      Inspect Certificate ↗
                    </span>
                  </div>
                </div>

                {/* Highlight badge overlay */}
                {cert.highlightText && (
                  <div className="absolute top-5 right-5 z-10">
                    <span
                      className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase text-white shadow-sm"
                      style={{ backgroundColor: cert.badgeColor }}
                    >
                      {cert.highlightText}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="text-xs uppercase font-mono tracking-wider font-bold"
                      style={{ color: cert.badgeColor }}
                    >
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-medium">
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors mb-2 leading-snug line-clamp-2">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-light">
                    {cert.description}
                  </p>
                </div>

                {/* Footer of card */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.keySkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200/90 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.keySkills.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-mono">
                        +{cert.keySkills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Verified Credential
                    </span>
                    <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                      Inspect
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-1.5">
              Explore Complete Credentials Archive
            </h3>
            <p className="text-sm text-slate-300 max-w-xl font-light">
              Access official Microsoft Learn verification portals, Credly badges, competition GUIDs, and downloadable original signed PDF certificates.
            </p>
          </div>

          <Link
            href="/certifications"
            className="relative z-10 flex-shrink-0 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center gap-2 group"
          >
            <span>Open Certifications Page</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Modal Lightbox */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCertIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
