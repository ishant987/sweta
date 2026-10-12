import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, PROJECTS_MAP, ProjectItem } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project: ProjectItem | undefined = PROJECTS_MAP[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-black transition-colors font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Selected Work
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-5">
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-wider font-semibold">
              {project.date}
            </span>
            {project.award && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-slate-950 shadow-2xs">
                {project.award}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-8">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 py-6 border-y border-slate-200 mt-8 sm:mt-10">
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">My Role</h4>
                <p className="text-sm text-slate-900 font-semibold">{project.role}</p>
             </div>
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">Client / Challenge</h4>
                <p className="text-sm text-slate-900 font-semibold">{project.client}</p>
             </div>
             <div className="sm:col-span-2 md:col-span-2">
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">Tools &amp; Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/90 text-blue-800 font-semibold shadow-2xs">
                      {tech}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-3">
              <span className="text-blue-600 font-mono text-lg sm:text-xl font-bold">01.</span> Project Overview
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6 flex items-center gap-3">
              <span className="text-blue-600 font-mono text-lg sm:text-xl font-bold">02.</span> Key Analytical Highlights &amp; Outcomes
            </h3>
            <div className="space-y-3.5 sm:space-y-4">
              {project.outcomes.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-600" />
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {project.githubUrl && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">Explore Source Code &amp; Documentation</h4>
                <p className="text-xs text-slate-500 mt-0.5">Check queries, data models, and dashboard screenshots on GitHub</p>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Open GitHub Repo</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          )}
          
          <div className="pt-8">
            <div className="w-full h-px bg-slate-200" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
