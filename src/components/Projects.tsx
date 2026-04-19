"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

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
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-white/[0.06] group-last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full bg-white/20 border-2 border-[#121212] group-hover:bg-[#a78bfa] transition-colors duration-300" />

      {/* Period */}
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-mono">
        {entry.period}
      </span>

      {/* Company & role */}
      <h3 className="text-xl md:text-2xl font-bold text-white/85 mt-2 leading-tight">
        {entry.company}
      </h3>
      <p className="text-sm text-[#a78bfa]/70 font-medium mt-1">
        {entry.role}
      </p>

      {/* Description */}
      <p className="text-sm text-white/35 leading-relaxed mt-3 max-w-lg font-light">
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
  color: string;
  year: string;
  slug: string;
}

const projects: Project[] = [
  {
    title: "Credit Card Transaction Analysis",
    category: "Data Analysis",
    description:
      "Analysed a large credit card transaction dataset to identify spending patterns. Identified the top 5 cities contributing 58% of total spending.",
    tags: ["MySQL", "Excel"],
    color: "#a78bfa",
    year: "2024",
    slug: "credit-card-analysis",
  },
  {
    title: "Food & Beverage Consumer Insights",
    category: "Data Visualization",
    description:
      "Analysed survey data from 10,000 respondents to understand consumer behaviour. Built interactive Power BI dashboards to visualise insights.",
    tags: ["MySQL", "Power BI"],
    color: "#f59e0b",
    year: "2023",
    slug: "food-beverage-insights",
  },
  {
    title: "Regional Sales Performance Dashboard",
    category: "Dashboard Design",
    description:
      "Designed an interactive Excel dashboard to monitor regional sales performance globally. Identified leading regions and key demographic segments.",
    tags: ["Excel", "Data Segmentation"],
    color: "#34d399",
    year: "2023",
    slug: "sales-performance-dashboard",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="glass-card rounded-2xl p-6 md:p-8 group cursor-pointer relative overflow-hidden"
    >
      {/* Accent glow on hover */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: project.color }}
      />

      {/* Top row */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span
          className="text-xs uppercase tracking-[0.15em] font-medium px-3 py-1 rounded-full"
          style={{
            color: project.color,
            background: `${project.color}15`,
          }}
        >
          {project.category}
        </span>
        <span className="text-xs text-white/25 font-mono">{project.year}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-3 relative z-10 group-hover:text-white transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/40 leading-relaxed mb-6 relative z-10 group-hover:text-white/50 transition-colors">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.06] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={project.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </motion.div>
    </Link>
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

  return (
    <>
      {/* ═══════════════ CAREER TIMELINE ═══════════════ */}
      <section
        id="about"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
        style={{ background: "#121212" }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div ref={timelineRef} className="mb-16 md:mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                timelineInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/90">
                Career Timeline
              </h2>
              <p className="mt-4 text-base text-white/30 font-light">
                Where I&apos;ve been and what I&apos;ve built
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
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20"
        style={{ background: "#121212" }}
      >
        {/* Divider line */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20 border-t border-white/[0.04]" />

        {/* Section heading */}
        <div ref={projectsRef} className="max-w-6xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              projectsInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#a78bfa] mb-4 font-medium">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/90 leading-[1.05]">
              Projects that
              <br />
              <span className="text-gradient">push boundaries</span>
            </h2>
            <p className="mt-6 text-base text-white/35 max-w-lg font-light leading-relaxed">
              A curated selection of work spanning web apps, mobile platforms,
              and design systems — each crafted with meticulous attention to
              detail.
            </p>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
