"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateModal from "@/components/CertificateModal";
import { CERTIFICATIONS, Certification } from "@/data/certifications";

const CATEGORIES = [
  "All",
  "Business Intelligence",
  "SQL & Databases",
  "Awards & Honors",
] as const;

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    const matchesCategory =
      activeCategory === "All" || cert.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.keySkills.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (cert.credentialId &&
        cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cert.guid && cert.guid.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Certifications</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs uppercase tracking-[0.2em] text-blue-700 font-mono font-bold">
              Official Accreditations &amp; Credentials
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-5">
            Certifications &amp; Accreditations
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-light leading-relaxed mb-10">
            A verified record of technical certifications, standardized skill clearances, and competitive honors across Microsoft Power BI, enterprise SQL, and business data analytics.
          </p>

          {/* Professional Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">5</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Verified Credentials</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-600">PL-300</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Microsoft Associate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">3rd Prize</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Codebasics Challenge</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">100%</div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">Authentic &amp; Verifiable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="px-6 md:px-12 lg:px-20 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 border-b border-slate-200/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? CERTIFICATIONS.length
                  : CERTIFICATIONS.filter((c) => c.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill, issuer, or ID..."
              className="w-full text-xs bg-white border border-slate-300 rounded-full px-4 py-2.5 pl-9 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors shadow-2xs"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Detailed Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-6xl mx-auto">
          {filteredCerts.length === 0 ? (
            <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl shadow-2xs">
              <p className="text-lg text-slate-800 font-semibold mb-2">No certificates found</p>
              <p className="text-xs text-slate-500 mb-6">
                Try adjusting your search criteria or reset filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCerts.map((cert) => {
                const globalIndex = CERTIFICATIONS.findIndex(
                  (c) => c.id === cert.id
                );
                const idValue = cert.credentialId || cert.guid;

                return (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="card-light rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all group bg-white"
                    style={{ borderTop: `4px solid ${cert.badgeColor}` }}
                  >
                    {/* Top Image Preview */}
                    <div
                      onClick={() => setSelectedCertIndex(globalIndex)}
                      className="relative aspect-[16/10] bg-slate-100 p-4 cursor-pointer overflow-hidden border-b border-slate-200/80"
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-200 group-hover:border-slate-400 transition-all shadow-2xs bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md text-white shadow-xl flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                            Inspect Full Certificate
                          </span>
                        </div>
                      </div>

                      {/* Highlight ribbon */}
                      {cert.highlightText && (
                        <div className="absolute top-6 right-6 z-10">
                          <span
                            className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase text-white shadow-sm"
                            style={{ backgroundColor: cert.badgeColor }}
                          >
                            {cert.highlightText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Issuer & Date */}
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-2xs"
                            style={{ backgroundColor: cert.badgeColor }}
                          >
                            {cert.issuer}
                          </span>
                          <span className="text-xs text-slate-400 font-mono font-medium">
                            {cert.issueDate}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-black transition-colors mb-2 leading-tight">
                          {cert.title}
                        </h3>

                        {cert.subtitle && (
                          <p className="text-xs text-slate-500 mb-4 font-medium">
                            {cert.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                          {cert.description}
                        </p>

                        {/* Credential ID row */}
                        {idValue && (
                          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/90 mb-6 text-xs">
                            <span className="text-slate-500 font-medium">Credential ID:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-slate-900 font-semibold max-w-[180px] truncate">
                                {idValue}
                              </span>
                              <button
                                onClick={() => handleCopyId(idValue)}
                                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
                              >
                                {copiedId === idValue ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Skills */}
                        <div className="mb-6">
                          <h4 className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                            Core Competencies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {cert.keySkills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setSelectedCertIndex(globalIndex)}
                          className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors border border-slate-300 flex items-center justify-center gap-2 shadow-2xs"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          Inspect Details
                        </button>

                        {cert.verifyUrl ? (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Verify Online
                          </a>
                        ) : (
                          <a
                            href={cert.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors border border-slate-300 flex items-center justify-center gap-2 shadow-2xs"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                            </svg>
                            Open PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modal Lightbox */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCertIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </main>
  );
}
