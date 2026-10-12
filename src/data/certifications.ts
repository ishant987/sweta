export interface Certification {
  id: string;
  title: string;
  subtitle?: string;
  issuer: "Microsoft" | "Codebasics" | "Coursera" | "HackerRank";
  issuerBadge: string;
  category: "Business Intelligence" | "Data Analytics" | "SQL & Databases" | "Awards & Honors";
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  guid?: string;
  verifyUrl?: string;
  image: string;
  pdf: string;
  badgeColor: string;
  accentGlow: string;
  description: string;
  keySkills: string[];
  featured: boolean;
  highlightText?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "microsoft-power-bi-analyst-associate",
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    subtitle: "Official Microsoft Professional Certification (PL-300)",
    issuer: "Microsoft",
    issuerBadge: "Microsoft Certified Associate",
    category: "Business Intelligence",
    issueDate: "July 13, 2026",
    expiryDate: "July 14, 2027",
    credentialId: "5EFE216190AD483",
    guid: "E3742E-I5E172",
    verifyUrl: "https://learn.microsoft.com/en-us/users/swetasah-9096/credentials/certification/data-analyst-associate?tab=credentials-tab",
    image: "/certificates/microsoft-certified-power-bi-data-analyst.png",
    pdf: "/certificates/microsoft-certified-power-bi-data-analyst.pdf",
    badgeColor: "#0078D4",
    accentGlow: "rgba(0, 120, 212, 0.25)",
    description: "Demonstrated comprehensive subject matter expertise in delivering actionable business insights using Power BI, including preparing, modeling, visualizing, and analyzing data, as well as managing and securing workspaces.",
    keySkills: ["Power BI", "Data Modeling", "DAX Formulas", "Power Query (ETL)", "Interactive Dashboards", "Row-Level Security (RLS)"],
    featured: true,
    highlightText: "Official Microsoft Associate",
  },
  {
    id: "codebasics-fnb-insights-3rd-prize",
    title: "Resume Project Challenge #6 — 3rd Prize Winner",
    subtitle: "Provide Insights to the Marketing Team in Food & Beverage Industry",
    issuer: "Codebasics",
    issuerBadge: "Competition Winner (3rd Prize)",
    category: "Awards & Honors",
    issueDate: "Aug 17, 2023",
    guid: "CB-CH-1-9-46253-1020",
    image: "/certificates/codebasics-fnb-insights-3rd-prize.png",
    pdf: "/certificates/codebasics-fnb-insights-3rd-prize.pdf",
    badgeColor: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    description: "Awarded 3rd Prize by Codebasics panel for exceptional exploratory data analysis, visual storytelling, and presenting impactful strategic marketing recommendations based on a 10,000+ respondent consumer dataset.",
    keySkills: ["Exploratory Data Analysis", "Executive Presentations", "Consumer Insights", "Power BI Dashboards", "Marketing Analytics"],
    featured: true,
    highlightText: "🏆 3rd Prize Winner",
  },
  {
    id: "coursera-microsoft-power-bi-professional",
    title: "Microsoft Power BI Data Analyst Professional Certificate",
    subtitle: "Multi-course Specialization by Microsoft & Coursera",
    issuer: "Coursera",
    issuerBadge: "Microsoft & Coursera Professional",
    category: "Business Intelligence",
    issueDate: "July 08, 2026",
    verifyUrl: "https://www.credly.com/go/vHMViZM3",
    image: "/certificates/coursera-microsoft-power-bi-professional.png",
    pdf: "/certificates/coursera-microsoft-power-bi-professional.pdf",
    badgeColor: "#0056D2",
    accentGlow: "rgba(0, 86, 210, 0.25)",
    description: "Rigorous specialization covering end-to-end data preparation, data cleaning, advanced calculations in DAX, data warehouse integration, report design principles, and collaborative Power BI Service deployment.",
    keySkills: ["Data Transformation", "Advanced DAX", "Power BI Service", "KPI Scorecards", "Business Reporting"],
    featured: true,
    highlightText: "Credly Verifiable",
  },
  {
    id: "codebasics-sql-beginner-to-advanced",
    title: "SQL Beginner to Advanced For Data Professionals",
    subtitle: "Comprehensive 1.5M+ Record Real-World Business Analytics",
    issuer: "Codebasics",
    issuerBadge: "Course Completion (>70% Final Exam)",
    category: "SQL & Databases",
    issueDate: "Apr 12, 2024",
    guid: "CB-50-46253",
    image: "/certificates/codebasics-sql-beginner-to-advanced.png",
    pdf: "/certificates/codebasics-sql-beginner-to-advanced.pdf",
    badgeColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.25)",
    description: "Mastered end-to-end relational database querying on massive real-time business datasets exceeding 1.5 million records. Completed practical business scenarios and cleared the final certification examination with >70% score.",
    keySkills: ["MySQL", "Complex Joins", "Window Functions", "CTEs", "Subqueries", "Query Optimization", "Business Analytics"],
    featured: true,
    highlightText: "1.5M+ Records Analyzed",
  },
  {
    id: "hackerrank-sql-basic",
    title: "SQL (Basic) Skill Certification",
    subtitle: "Standardized Technical Assessment Clearance",
    issuer: "HackerRank",
    issuerBadge: "HackerRank Certified",
    category: "SQL & Databases",
    issueDate: "Apr 20, 2024",
    credentialId: "AD027BFF95A6",
    image: "/certificates/hackerrank-sql-basic.png",
    pdf: "/certificates/hackerrank-sql-basic.pdf",
    badgeColor: "#22c55e",
    accentGlow: "rgba(34, 197, 94, 0.25)",
    description: "Successfully cleared HackerRank's rigorous timed technical assessment evaluating fundamental and relational query proficiencies, aggregation filters, conditional logic, and relational integrity.",
    keySkills: ["SQL", "Relational Databases", "Data Filtering", "Aggregations", "Conditional Logic"],
    featured: false,
    highlightText: "Verified Technical Assessment",
  },
];
