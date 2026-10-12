export interface Certification {
  id: string;
  title: string;
  subtitle?: string;
  issuer: "Microsoft" | "Codebasics" | "Coursera" | "HackerRank" | "Udemy";
  issuerBadge: string;
  category: "Business Intelligence" | "Data Analytics" | "SQL & Databases" | "Awards & Honors" | "Python & Statistics";
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
    id: "udemy-python-bootcamp",
    title: "The Complete Python Bootcamp From Zero to Hero in Python",
    subtitle: "Comprehensive 22.5 Hours Python Engineering by Jose Portilla",
    issuer: "Udemy",
    issuerBadge: "Udemy Certified Completion",
    category: "Python & Statistics",
    issueDate: "Oct. 12, 2026",
    credentialId: "UC-afcf188c-dfba-490e-ad91-5329139181d4",
    verifyUrl: "https://ude.my/UC-afcf188c-dfba-490e-ad91-5329139181d4",
    image: "/certificates/udemy-python-bootcamp.png",
    pdf: "/certificates/udemy-python-bootcamp.pdf",
    badgeColor: "#a435f0",
    accentGlow: "rgba(164, 53, 240, 0.25)",
    description: "Completed 22.5 hours of comprehensive Python programming training instructed by Jose Portilla (Pierian Training), mastering object-oriented programming (OOP), complex data structures, generators, decorators, error handling, file I/O, and data analysis scripting.",
    keySkills: ["Python", "OOP", "Data Structures", "Scripting", "Modules & Packages", "Error Handling", "File I/O"],
    featured: true,
    highlightText: "22.5 Hours Python",
  },
  {
    id: "udemy-statistics-data-science",
    title: "Statistics for Data Science and Business Analysis",
    subtitle: "Statistical Foundations, Hypothesis Testing & Regression by 365 Careers",
    issuer: "Udemy",
    issuerBadge: "Udemy Certified Completion",
    category: "Python & Statistics",
    issueDate: "Oct. 12, 2026",
    credentialId: "UC-8388df17-d6a2-4e77-9bef-1f4974abda63",
    verifyUrl: "https://ude.my/UC-8388df17-d6a2-4e77-9bef-1f4974abda63",
    image: "/certificates/udemy-statistics-data-science.png",
    pdf: "/certificates/udemy-statistics-data-science.pdf",
    badgeColor: "#059669",
    accentGlow: "rgba(5, 150, 105, 0.25)",
    description: "Mastered essential descriptive and inferential statistics for business decision making, including probability distributions, central limit theorem, confidence intervals, hypothesis testing (Z, t, and ANOVA), and linear regression analysis.",
    keySkills: ["Descriptive Statistics", "Inferential Statistics", "Hypothesis Testing", "Confidence Intervals", "Regression Analysis", "Business Analytics"],
    featured: true,
    highlightText: "Statistical Modeling",
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
    subtitle: "Comprehensive Real-World Enterprise Business Analytics",
    issuer: "Codebasics",
    issuerBadge: "Course Completion (>70% Final Exam)",
    category: "SQL & Databases",
    issueDate: "Apr 12, 2024",
    guid: "CB-50-46253",
    image: "/certificates/codebasics-sql-beginner-to-advanced.png",
    pdf: "/certificates/codebasics-sql-beginner-to-advanced.pdf",
    badgeColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.25)",
    description: "Mastered end-to-end relational database querying on enterprise business datasets. Completed practical business scenarios and cleared the final certification examination with >70% score.",
    keySkills: ["MySQL", "Complex Joins", "Window Functions", "CTEs", "Subqueries", "Query Optimization", "Business Analytics"],
    featured: true,
    highlightText: "Enterprise SQL Querying",
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
    badgeColor: "#16a34a",
    accentGlow: "rgba(22, 163, 74, 0.25)",
    description: "Successfully cleared HackerRank's rigorous timed technical assessment evaluating fundamental and relational query proficiencies, aggregation filters, conditional logic, and relational integrity.",
    keySkills: ["SQL", "Relational Databases", "Data Filtering", "Aggregations", "Conditional Logic"],
    featured: false,
    highlightText: "Verified Technical Assessment",
  },
];
