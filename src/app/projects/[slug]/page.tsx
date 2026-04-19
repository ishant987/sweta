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
    coverGradient: "from-[#a78bfa]/20 via-[#121212] to-[#121212]",
    accentColor: "text-[#a78bfa]",
  },
  "food-beverage-insights": {
    title: "Food & Beverage Consumer Insights",
    category: "Data Visualization",
    date: "Aug 2023",
    client: "Market Research Initiative",
    role: "Data Analyst",
    overview:
      "An in-depth study of consumer behaviour based on survey data collected from 10,000 respondents across 10 major cities. This project focused on understanding brand perception and defining product preferences.",
    technologies: ["MySQL", "Power BI"],
    outcomes: [
      "Built interactive Power BI dashboards to effectively visualize complex survey insights.",
      "Identified Bangalore, Hyderabad, and Mumbai as high-potential core markets.",
      "Formulated actionable recommendations based on evolving consumer response patterns.",
    ],
    coverGradient: "from-[#f59e0b]/20 via-[#121212] to-[#121212]",
    accentColor: "text-[#f59e0b]",
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
    coverGradient: "from-[#34d399]/20 via-[#121212] to-[#121212]",
    accentColor: "text-[#34d399]",
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
    <main className="bg-[#121212] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className={`relative pt-40 pb-24 md:pt-52 md:pb-32 px-6 md:px-12 lg:px-20 bg-gradient-to-b ${project.coverGradient}`}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 md:mb-12"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Projects
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span
              className={`text-xs uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] ${project.accentColor}`}
            >
              {project.category}
            </span>
            <span className="text-xs text-white/30 font-mono tracking-wider">
              {project.date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/95 leading-[1.05] mb-8">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/[0.06] mt-12 mb-8">
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-2 font-semibold">My Role</h4>
                <p className="text-sm text-white/80">{project.role}</p>
             </div>
             <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-2 font-semibold">Client</h4>
                <p className="text-sm text-white/80">{project.client}</p>
             </div>
             <div className="col-span-2 md:col-span-2">
                <h4 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-2 font-semibold">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className="text-sm text-white/80">
                      {tech}
                      <span className="last:hidden opacity-30 mx-2">•</span>
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-3">
              <span className={`${project.accentColor}`}>01.</span> Project Overview
            </h3>
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-3">
              <span className={`${project.accentColor}`}>02.</span> Key Analytical Highlights
            </h3>
            <div className="space-y-4">
              {project.outcomes.map((outcome: string, index: number) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-2xl glass-card">
                  <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-current ${project.accentColor}`} />
                  <p className="text-base text-white/70 leading-relaxed font-light">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
