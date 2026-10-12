import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define project details using the specific data provided in the CV
const projectsData: Record<string, any> = {
  "credit-card-analysis": {
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
    title: "Food & Beverage Consumer Insights",
    category: "Data Visualization",
    date: "Aug 2023",
    client: "Codebasics Resume Challenge",
    role: "Data Analyst",
    overview:
      "An in-depth study of consumer behaviour based on survey data collected from 10,000 respondents across 10 major cities. This project focused on understanding brand perception and defining product preferences.",
    technologies: ["MySQL", "Power BI"],
    outcomes: [
      "Awarded 3rd Prize in Codebasics Resume Project Challenge #6 by industry evaluators.",
      "Built interactive Power BI dashboards to effectively visualize complex survey insights.",
      "Identified Bangalore, Hyderabad, and Mumbai as high-potential core markets.",
      "Formulated actionable recommendations based on evolving consumer response patterns.",
    ],
  },
  "sales-performance-dashboard": {
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

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }));
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-black transition-colors mb-8 md:mb-10 font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Projects
          </Link>
          
          <div className="flex items-center gap-4 mb-5">
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 font-mono tracking-wider font-semibold">
              {project.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-8">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-200 mt-10">
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">My Role</h4>
                <p className="text-sm text-slate-900 font-semibold">{project.role}</p>
             </div>
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">Client</h4>
                <p className="text-sm text-slate-900 font-semibold">{project.client}</p>
             </div>
             <div className="col-span-2 md:col-span-2">
                <h4 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1.5 font-bold">Tools Used</h4>
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
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-blue-600 font-mono text-xl font-bold">01.</span> Project Overview
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-blue-600 font-mono text-xl font-bold">02.</span> Key Analytical Highlights
            </h3>
            <div className="space-y-4">
              {project.outcomes.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                  <div className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-blue-600" />
                  <p className="text-base text-slate-700 leading-relaxed font-normal">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-8">
            <div className="w-full h-px bg-slate-200" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
