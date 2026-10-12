"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export interface ProjectDetailData {
  title: string;
  category: string;
  date: string;
  client: string;
  role: string;
  overview: string;
  technologies: string[];
  outcomes: string[];
  slug: string;
  award?: string;
}

export const PROJECTS_DETAILED: Record<string, ProjectDetailData> = {
  "credit-card-analysis": {
    slug: "credit-card-analysis",
    title: "Credit Card Transaction Analysis",
    category: "Data Analysis",
    date: "May 2024",
    client: "Internal Data Science Project",
    role: "Data Analyst",
    overview:
      "A comprehensive analysis of a large credit card transaction dataset. The project focused on uncovering deep spending patterns across various geographic regions, diverse demographics, and specific card types to drive strategic business decisions.",
    technologies: ["MySQL", "Advanced Excel"],
    outcomes: [
      "Identified the top 5 cities contributing to 58.6% of the total spending.",
      "Highlighted key high-value markets essential for targeted marketing campaigns.",
      "Translated raw analytical findings into clear, impactful visual summaries and business insights.",
    ],
  },
  "food-beverage-insights": {
    slug: "food-beverage-insights",
    title: "Food & Beverage Consumer Insights",
    category: "Data Visualization",
    date: "Aug 2023",
    client: "Codebasics Resume Challenge",
    role: "Data Analyst",
    overview:
      "An in-depth study of consumer behaviour based on survey data collected from 10,000 respondents across 10 major cities. This project focused on understanding brand perception and defining product preferences.",
    technologies: ["MySQL", "Power BI"],
    award: "🏆 3rd Prize Winner — Codebasics Challenge",
    outcomes: [
      "Awarded 3rd Prize in Codebasics Resume Project Challenge #6 by industry evaluators.",
      "Built interactive Power BI dashboards to effectively visualize complex survey insights.",
      "Identified Bangalore, Hyderabad, and Mumbai as high-potential core markets.",
      "Formulated actionable recommendations based on evolving consumer response patterns.",
    ],
  },
  "sales-performance-dashboard": {
    slug: "sales-performance-dashboard",
    title: "Regional Sales Performance Dashboard",
    category: "Dashboard Design",
    date: "Mar 2023",
    client: "Global Sales Strategy Project",
    role: "Data Analyst",
    overview:
      "Designed and implemented a sophisticated, interactive Excel dashboard targeted at monitoring and decoding regional sales performance across Europe, North America, and the Pacific regions.",
    technologies: ["Advanced Excel", "Data Segmentation"],
    outcomes: [
      "Identified North America as the leading global region, driving 41.5% of total international purchases.",
      "Performed advanced segmentation analysis to isolate the highest-value core customer demographics (specifically the 31–54 age bracket).",
      "Created an automated tracking system saving hours of manual data collation each week.",
    ],
  },
};

interface ProjectModalProps {
  project: ProjectDetailData | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 md:p-8 pt-20 sm:pt-20 md:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col p-6 sm:p-8 md:p-10 text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black flex items-center justify-center transition-all border border-slate-200 shadow-xs"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Header Row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 font-mono font-semibold">
              {project.date}
            </span>
            {project.award && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-slate-950 shadow-2xs">
                {project.award}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight pr-10">
            {project.title}
          </h2>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-6 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Role</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Client / Scope</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{project.client}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium block">Technologies</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-bold font-mono">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          {/* Key Deliverables & Outcomes */}
          <div className="mb-8">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-bold font-mono">
              Key Deliverables &amp; Business Outcomes
            </h4>
            <div className="space-y-2.5">
              {project.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200"
                >
                  ← Previous Work
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200"
                >
                  Next Work →
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors text-center"
              >
                Close Preview
              </button>
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Full Case Study Page</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
