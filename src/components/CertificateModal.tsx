"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Certification } from "@/data/certifications";

interface CertificateModalProps {
  certificate: Certification | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
  onNext,
  onPrev,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    if (!mounted) return;
    if (certificate) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mounted, certificate]);

  if (!mounted || !certificate) return null;

  const idToCopy = certificate.credentialId || certificate.guid;

  const handleCopy = () => {
    if (idToCopy) {
      navigator.clipboard.writeText(idToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 md:p-8 pt-16 sm:pt-20 md:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[88vh] sm:max-h-[85vh] overflow-y-auto bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black flex items-center justify-center transition-all border border-slate-200 shadow-xs"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left: Certificate Preview */}
          <div className="lg:w-7/12 bg-slate-100/90 p-4 sm:p-8 md:p-10 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xl group bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-auto object-contain bg-white rounded-lg"
              />
            </div>

            {/* Quick action bar below image */}
            <div className="flex items-center justify-between w-full mt-6 text-xs text-slate-600">
              <a
                href={certificate.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 transition-colors border border-slate-200 font-medium shadow-2xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Open Original PDF
              </a>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                {onPrev && (
                  <button
                    onClick={onPrev}
                    aria-label="Previous certificate"
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200 shadow-2xs"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                )}
                {onNext && (
                  <button
                    onClick={onNext}
                    aria-label="Next certificate"
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 transition-colors border border-slate-200 shadow-2xs"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Certificate Details */}
          <div className="lg:w-5/12 p-4 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Badge & Category */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                  {certificate.issuerBadge}
                </span>
                <span className="text-xs text-slate-400 font-mono font-medium">
                  {certificate.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                {certificate.title}
              </h3>
              {certificate.subtitle && (
                <p className="text-sm text-slate-500 mb-5 font-medium">
                  {certificate.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-light">
                {certificate.description}
              </p>

              {/* Key Metadata Table */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/90 mb-6 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-400 font-medium">Issuer</span>
                  <span className="font-bold text-slate-900">{certificate.issuer}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="text-slate-400 font-medium">Issued Date</span>
                  <span className="font-mono text-slate-800 font-semibold">{certificate.issueDate}</span>
                </div>
                {certificate.expiryDate && (
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-slate-400 font-medium">Expiration Date</span>
                    <span className="font-mono text-slate-800 font-semibold">{certificate.expiryDate}</span>
                  </div>
                )}
                {idToCopy && (
                  <div className="flex justify-between items-center text-slate-600 pt-2.5 border-t border-slate-200">
                    <span className="text-slate-400 font-medium">Credential ID / GUID</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-900 font-bold max-w-[170px] truncate">
                        {idToCopy}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Key Skills */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Competencies &amp; Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.keySkills.map((skill) => (
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

            {/* Verification Link Button */}
            <div className="pt-4 border-t border-slate-200">
              {certificate.verifyUrl ? (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-black transition-all shadow-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Verify Online on Official Portal
                </a>
              ) : (
                <a
                  href={certificate.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-800 bg-white hover:bg-slate-50 transition-all border border-slate-300 shadow-2xs"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                  View Official Signed Credential
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
