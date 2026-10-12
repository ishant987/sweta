"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectModal from "@/components/ProjectModal";
import { PROJECTS, ProjectItem, PROJECTS_MAP } from "@/data/projects";

/* ═══════════════════════════════════════════
   CAREER TIMELINE
   ═══════════════════════════════════════════ */

interface TimelineEntry {
  period: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
}

const timeline: TimelineEntry[] = [
  {
    period: "May 2024 — Present",
    company: "Infrrd Pvt. Ltd. (via Cosmonet AI)",
    role: "Data Processing Executive",
    description:
      "Contribute to AI-powered Intelligent Document Processing (IDP) workflows for US insurance, mortgage, and banking clients.",
    highlights: [
      "Auto Insurance (State National - US client): Contributed to the end-to-end development of live IDP product for document classification & data extraction; trained a team of 8 on extraction workflows, business rules, and quality standards.",
      "US Mortgage Portfolio: Pre-underwriting analyst training machine learning models on extraction, document classification, versioning, and document tagging; supported multi-stage UAT and production verification.",
      "Banking Project (Laminr - US client): Performing SLA-bound data extraction on live workflows meeting turnaround and quality targets; active in daily stakeholder reviews.",
      "Quality & Root Cause Analysis: Conducted root cause analysis on recurring extraction and workflow issues, developed SOPs, and recommended product improvements to engineering and product teams.",
    ],
  },
  {
    period: "Apr 2023 — Mar 2024",
    company: "AIMonk Labs Pvt. Ltd.",
    role: "Annotation Executive",
    description:
      "Performed data annotation and quality validation across image, text, and document datasets for AI and machine learning projects.",
    highlights: [
      "Collaborated with QA teams and ML engineers to clarify annotation guidelines, investigate error and rejection patterns, and improve dataset consistency and model performance.",
      "Prepared annotation guidelines, SOP documentation, and successfully onboarded new team members on workflows and quality standards.",
      "Consistently achieved high productivity, quality validation, and turnaround SLAs across multiple client projects.",
    ],
  },
  {
    period: "2019 — 2022",
    company: "Jadavpur University",
    role: "Bachelor of Science (Honours) — Textile Science, Clothing and Fashion Studies",
    description:
      "Graduated with Distinction | CGPA: 9.43 / 10",
    highlights: [],
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

      {/* Period badge */}
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
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1.5 leading-tight">
        {entry.company}
      </h3>
      <p className="text-sm text-blue-600 font-semibold mt-0.5">
        {entry.role}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-xl font-light">
        {entry.description}
      </p>

      {/* Bullet highlights */}
      {entry.highlights && entry.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {entry.highlights.map((h, i) => (
            <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TECHNICAL SKILLS MATRIX
   ═══════════════════════════════════════════ */

interface SkillCategory {
  title: string;
  badge: string;
  badgeColor: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Data Analysis & Programming",
    badge: "Core",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    skills: ["SQL (MySQL)", "Python (Fundamentals)", "Statistics & Probability", "Data Cleaning", "CTEs & Window Functions"],
  },
  {
    title: "Visualisation & BI",
    badge: "Certified",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    skills: ["Power BI (PL-300)", "DAX Modeling", "Power Query", "Microsoft Excel", "PivotTables & Slicers", "Executive Dashboards"],
  },
  {
    title: "AI & Document Processing",
    badge: "Enterprise",
    badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
    skills: ["Intelligent Document Processing (IDP)", "Document Classification", "Data Extraction & Versioning", "UAT Validation"],
  },
  {
    title: "Business & Analytical Skills",
    badge: "Process",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    skills: ["Requirement Gathering", "Root Cause Analysis", "Stakeholder Communication", "SOP Development", "AS-IS & TO-BE Analysis"],
  },
  {
    title: "Graduate Academic Interests",
    badge: "Master's Focus",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    skills: ["SQL", "Power BI", "Python", "Predictive Analytics", "AI Applications", "Decision Intelligence"],
  },
  {
    title: "Honors & Academic Credentials",
    badge: "Distinction",
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    skills: ["CGPA: 9.43 / 10 (Honours)", "Codebasics Challenge Rank 3rd", "Microsoft Certified PL-300", "SQL Advanced (70%+)"],
  },
];

/* ═══════════════════════════════════════════
   PROJECT THEMES & CARDS
   ═══════════════════════════════════════════ */

const PROJECT_THEMES: Record<
  string,
  {
    topBorder: string;
    categoryBadge: string;
    ctaText: string;
  }
> = {
  "consumer-engagement-market-insights": {
    topBorder: "border-t-4 border-t-amber-500",
    categoryBadge: "bg-amber-500 text-slate-950 font-bold",
    ctaText: "text-amber-700 group-hover:text-amber-800",
  },
  "credit-card-analysis": {
    topBorder: "border-t-4 border-t-blue-600",
    categoryBadge: "bg-blue-600 text-white font-semibold",
    ctaText: "text-blue-600 group-hover:text-blue-700",
  },
  "bank-customer-churn-analysis": {
    topBorder: "border-t-4 border-t-teal-600",
    categoryBadge: "bg-teal-600 text-white font-semibold",
    ctaText: "text-teal-600 group-hover:text-teal-700",
  },
  "sales-dashboard-excel": {
    topBorder: "border-t-4 border-t-emerald-600",
    categoryBadge: "bg-emerald-600 text-white font-semibold",
    ctaText: "text-emerald-700 group-hover:text-emerald-800",
  },
  "sales-insights-atliq-hardware": {
    topBorder: "border-t-4 border-t-indigo-600",
    categoryBadge: "bg-indigo-600 text-white font-semibold",
    ctaText: "text-indigo-600 group-hover:text-indigo-700",
  },
  "ecommerce-sales-insights": {
    topBorder: "border-t-4 border-t-sky-600",
    categoryBadge: "bg-sky-600 text-white font-semibold",
    ctaText: "text-sky-600 group-hover:text-sky-700",
  },
  "sql-case-studies": {
    topBorder: "border-t-4 border-t-purple-600",
    categoryBadge: "bg-purple-600 text-white font-semibold",
    ctaText: "text-purple-600 group-hover:text-purple-700",
  },
};

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const theme = PROJECT_THEMES[project.slug] || {
    topBorder: "border-t-4 border-t-slate-800",
    categoryBadge: "bg-slate-800 text-white font-semibold",
    ctaText: "text-slate-800 group-hover:text-black",
  };

  return (
    <div onClick={onOpen} className="block text-left cursor-pointer h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`card-light rounded-2xl p-6 md:p-7 group relative overflow-hidden flex flex-col justify-between bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-lg transition-all h-full ${theme.topBorder}`}
      >
        <div>
          {/* Top row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs ${theme.categoryBadge}`}>
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {project.stars !== undefined && project.stars > 0 && (
                <span className="text-[10px] text-amber-700 font-mono font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  ★ {project.stars}
                </span>
              )}
              <span className="text-xs text-slate-500 font-mono font-semibold">{project.year}</span>
            </div>
          </div>

          {/* Award badge if present */}
          {project.award && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-xs">
                {project.award}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-light">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-100 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className={`flex items-center gap-1 text-xs font-bold ${theme.ctaText} transition-colors`}>
              <span>Case Study</span>
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

            {/* Direct GitHub repo link button */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors border border-slate-200"
              title="Open GitHub Repository"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT EXPORT
   ═══════════════════════════════════════════ */

export default function Projects() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-80px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const githubInView = useInView(githubRef, { once: true, margin: "-80px" });

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const selectedProject =
    selectedProjectIndex !== null ? PROJECTS[selectedProjectIndex] : null;

  const handleNext = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % PROJECTS.length);
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex(
        (selectedProjectIndex - 1 + PROJECTS.length) % PROJECTS.length
      );
    }
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 relative z-10 border-t border-slate-200/80">
      {/* ═══════════════ CAREER TIMELINE ═══════════════ */}
      <section
        id="about"
        className="relative py-16 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div ref={timelineRef} className="mb-12 md:mb-18 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-3 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 font-mono">
                  Experience &amp; Academic Background
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Professional &amp; Academic Journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-light max-w-2xl mx-auto">
                3+ years of experience supporting AI-enabled digital transformation initiatives across US insurance, mortgage, and banking domains.
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

      {/* ═══════════════ TECHNICAL SKILLS ═══════════════ */}
      <section className="relative py-14 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-50 border-t border-slate-200/80">
        <div ref={skillsRef} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 font-mono">
                Technical Toolkit
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Core Skills &amp; Competencies
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-light max-w-lg mx-auto">
              Structured capabilities across SQL querying, BI modeling, and production operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SELECTED WORK (6 PROJECTS) ═══════════════ */}
      <section
        id="projects"
        className="relative py-16 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-slate-200/80 bg-white"
      >
        {/* Section heading */}
        <div ref={projectsRef} className="max-w-6xl mx-auto mb-12 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 mb-3 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-700 font-mono">
                  GitHub Repositories
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                Featured Projects
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl font-light leading-relaxed">
                7 curated analytics projects spanning customer churn modeling, survey segmentation, financial analytics, sales intelligence, and SQL case studies.
              </p>
            </div>

            <a
              href="https://github.com/Sweta-Sah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-sm self-start md:self-auto"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Follow @Sweta-Sah on GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Project grid: all 7 projects */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onOpen={() => setSelectedProjectIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════ GITHUB PROFILE & ACTIVITY BANNER ═══════════════ */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-900 text-white border-t border-slate-800">
        <div ref={githubRef} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={githubInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>github.com/Sweta-Sah</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                Open Source &amp; Analytical Activity
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
                7 active public repositories dedicated to SQL optimization, Python data analytics, Power BI interactive dashboard reporting, and business datasets.
              </p>

              {/* GitHub metrics strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-slate-200 font-mono">
                  📊 7 Analytical Repositories
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-slate-200 font-mono">
                  🏆 Ranked 3rd in Codebasics Challenge
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-slate-200 font-mono">
                  🎓 Microsoft Certified PL-300
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href="https://github.com/Sweta-Sah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>View Full GitHub Profile</span>
              </a>
              <a
                href="https://github.com/Sweta-Sah/SQL_CASE_STUDIES"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>Browse SQL Scripts</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </motion.div>
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
