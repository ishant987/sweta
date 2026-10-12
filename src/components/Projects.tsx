"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ProjectModal, { PROJECTS_DETAILED } from "@/components/ProjectModal";

/* ═══════════════════════════════════════════
   CAREER TIMELINE
   ═══════════════════════════════════════════ */

interface TimelineEntry {
  period: string;
  company: string;
  role: string;
  description: string;
}

const timeline: TimelineEntry[] = [
  {
    period: "May 2024 — Present",
    company: "Infrrd Pvt. Ltd",
    role: "Data Processing Executive",
    description:
      "Extracted, classified, and validated data from complex structured and unstructured documents across multiple industries using an AI-powered IDP platform. Delivered consistently high-quality labelled datasets to improve ML model performance.",
  },
  {
    period: "April 2023 — March 2024",
    company: "AIMonk Labs Pvt. Ltd",
    role: "Annotation Executive",
    description:
      "Executed large-scale data annotation across image, text, and audio datasets for computer vision and generative AI projects. Managed multiple annotation projects simultaneously, maintaining high accuracy under strict deadlines.",
  },
  {
    period: "2019 — 2022",
    company: "Jadavpur University",
    role: "Bachelor of Textile Science",
    description:
      "Graduated with a CGPA of 9.43.",
  },
];

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-slate-200 group-last:hidden" />

      {/* Timeline dot */}
      <div
        className={`absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full border-2 border-white ${
          index === 0
            ? "bg-blue-600 ring-4 ring-blue-100"
            : "bg-slate-800 ring-4 ring-slate-100"
        }`}
      />

      {/* Period */}
      {index === 0 ? (
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white font-mono font-bold bg-blue-600 px-3 py-1 rounded-full shadow-2xs mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {entry.period}
        </span>
      ) : (
        <span className="text-xs uppercase tracking-wider text-slate-700 font-mono font-semibold bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
          {entry.period}
        </span>
      )}

      {/* Company & role */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 leading-tight">
        {entry.company}
      </h3>
      <p className="text-sm text-slate-700 font-medium mt-1">
        {entry.role}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mt-2.5 max-w-lg font-light">
        {entry.description}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════ */

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  slug: string;
  award?: string;
}

const projects: Project[] = [
  {
    title: "Credit Card Transaction Analysis",
    category: "Data Analysis",
    description:
      "Analysed a large credit card transaction dataset to identify spending patterns. Identified the top 5 cities contributing 58% of total spending.",
    tags: ["MySQL", "Excel"],
    year: "2024",
    slug: "credit-card-analysis",
  },
  {
    title: "Food & Beverage Consumer Insights",
    category: "Data Visualization",
    description:
      "Analysed survey data from 10,000 respondents to understand consumer behaviour. Built interactive Power BI dashboards to visualise insights.",
    tags: ["MySQL", "Power BI"],
    year: "2023",
    slug: "food-beverage-insights",
    award: "🏆 3rd Prize Winner — Codebasics Challenge",
  },
  {
    title: "Regional Sales Performance Dashboard",
    category: "Dashboard Design",
    description:
      "Designed an interactive Excel dashboard to monitor regional sales performance globally. Identified leading regions and key demographic segments.",
    tags: ["Excel", "Data Segmentation"],
    year: "2023",
    slug: "sales-performance-dashboard",
  },
];

const PROJECT_THEMES: Record<
  string,
  {
    topBorder: string;
    categoryBadge: string;
    tagStyles: Record<string, string>;
    ctaText: string;
  }
> = {
  "credit-card-analysis": {
    topBorder: "border-t-4 border-t-blue-600",
    categoryBadge: "bg-blue-600 text-white font-semibold",
    tagStyles: {
      MySQL: "bg-sky-100 text-sky-800 border-sky-300 font-semibold",
      Excel: "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold",
    },
    ctaText: "text-blue-600 group-hover:text-blue-700",
  },
  "food-beverage-insights": {
    topBorder: "border-t-4 border-t-amber-500",
    categoryBadge: "bg-indigo-600 text-white font-semibold",
    tagStyles: {
      MySQL: "bg-sky-100 text-sky-800 border-sky-300 font-semibold",
      "Power BI": "bg-amber-100 text-amber-900 border-amber-300 font-semibold",
    },
    ctaText: "text-indigo-600 group-hover:text-indigo-700",
  },
  "sales-performance-dashboard": {
    topBorder: "border-t-4 border-t-emerald-600",
    categoryBadge: "bg-emerald-600 text-white font-semibold",
    tagStyles: {
      Excel: "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold",
      "Data Segmentation": "bg-purple-100 text-purple-800 border-purple-300 font-semibold",
    },
    ctaText: "text-emerald-700 group-hover:text-emerald-800",
  },
};

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const theme = PROJECT_THEMES[project.slug] || {
    topBorder: "border-t-4 border-t-slate-800",
    categoryBadge: "bg-slate-800 text-white font-semibold",
    tagStyles: {},
    ctaText: "text-slate-800 group-hover:text-black",
  };

  return (
    <div onClick={onOpen} className="block text-left cursor-pointer">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.5,
          delay: index * 0.12,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`card-light rounded-2xl p-6 md:p-8 group relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-lg transition-all h-full ${theme.topBorder}`}
      >
        <div>
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs ${theme.categoryBadge}`}>
              {project.category}
            </span>
            <span className="text-xs text-slate-500 font-mono font-semibold">{project.year}</span>
          </div>

          {/* Award badge if present */}
          {project.award && (
            <div className="mb-3.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-slate-950 shadow-xs">
                {project.award}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-6 font-light">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-md border ${
                  theme.tagStyles[tag] || "bg-slate-100 text-slate-700 border-slate-200 font-medium"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow / CTA */}
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
            <div className={`flex items-center gap-1 text-xs font-semibold ${theme.ctaText} transition-colors`}>
              <span>View Case Study</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Quick Preview</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export default function Projects() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-80px",
  });
  const projectsInView = useInView(projectsRef, {
    once: true,
    margin: "-100px",
  });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const selectedProject =
    selectedProjectIndex !== null
      ? PROJECTS_DETAILED[projects[selectedProjectIndex].slug]
      : null;

  const handleNext = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % projects.length);
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex(
        (selectedProjectIndex - 1 + projects.length) % projects.length
      );
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 relative z-10">
      {/* ═══════════════ CAREER TIMELINE ═══════════════ */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div ref={timelineRef} className="mb-16 md:mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                timelineInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-3 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 font-mono">
                  Professional Journey
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Career Timeline
              </h2>
              <p className="mt-3 text-base text-slate-600 font-light max-w-md mx-auto">
                Track record in data processing, classification, and technical analysis.
              </p>
            </motion.div>
          </div>

          {/* Timeline entries */}
          <div className="relative">
            {timeline.map((entry, i) => (
              <TimelineItem key={entry.company} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section
        id="projects"
        className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-slate-200/80 bg-white"
      >
        {/* Section heading */}
        <div ref={projectsRef} className="max-w-6xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              projectsInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 font-mono">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
              Analytical Projects &amp; Case Studies
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-xl font-light leading-relaxed">
              Curated analytics projects combining structured SQL querying, interactive Power BI dashboards, and data-driven business recommendations.
            </p>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpen={() => setSelectedProjectIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
