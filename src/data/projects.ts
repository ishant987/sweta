export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  date: string;
  description: string;
  tags: string[];
  client: string;
  role: string;
  overview: string;
  technologies: string[];
  outcomes: string[];
  award?: string;
  githubUrl: string;
  stars?: number;
  forks?: number;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "consumer-engagement-market-insights",
    title: "Consumer Engagement & Market Insights Dashboard",
    category: "Market Analytics",
    year: "2023",
    date: "Aug 2023",
    award: "🏆 3rd Prize Winner — Codebasics Challenge",
    description:
      "Analyzed survey data from 10,000 respondents across 10 major metropolitan cities. Built interactive Power BI dashboard for consumer segmentation and market insights.",
    tags: ["MySQL", "Power BI", "DAX", "KPI Analysis"],
    client: "Codebasics Resume Challenge #6",
    role: "Data Analyst",
    overview:
      "An in-depth study of consumer behaviour based on survey data collected from 10,000 respondents across 10 major metropolitan cities. This project focused on understanding brand perception, defining product preferences, and formulating data-backed go-to-market strategies.",
    technologies: ["MySQL", "Power BI", "DAX", "SQL Joins", "KPI Analysis"],
    outcomes: [
      "Awarded 3rd Prize in Codebasics Resume Project Challenge #6 by industry evaluators.",
      "Cleaned and analyzed survey data using SQL joins, aggregations, and KPI analysis.",
      "Built interactive Power BI dashboards for consumer segmentation and market insights.",
      "Identified Bangalore, Hyderabad, and Mumbai as high-potential core markets.",
      "Developed actionable recommendations for target-market selection, brand positioning, and marketing strategy.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/Consumer-Engagement-Market-Insights-Dashboard",
    stars: 2,
    forks: 1,
  },
  {
    slug: "credit-card-analysis",
    title: "Credit Card Transaction Analysis",
    category: "Financial Analytics",
    year: "2024",
    date: "May 2024",
    description:
      "Analyzed credit card transactions to uncover spending patterns, customer behavior, and revenue-generating segments using CTEs, window functions, and subqueries.",
    tags: ["MySQL", "Advanced Excel", "CTEs", "Window Functions"],
    client: "Banking & Financial Services",
    role: "Data Analyst",
    overview:
      "A comprehensive analysis of a large credit card transaction dataset. The project focused on uncovering deep spending patterns across various geographic regions, diverse demographics, and specific card types to drive strategic business decisions.",
    technologies: ["MySQL", "Advanced Excel", "CTEs", "Window Functions", "CASE Statements"],
    outcomes: [
      "Identified the top 5 cities contributing to 58.6% of the total spending volume.",
      "Evaluated performance across customer demographics, transaction categories, cities, and card types.",
      "Used CTEs, window functions, subqueries, and CASE statements to segment cardholders.",
      "Translated transaction data into business insights and actionable promotional strategies.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/Credit_Card_Transaction_Anlysis",
  },
  {
    slug: "sales-dashboard-excel",
    title: "Sales Dashboard — Excel",
    category: "Spreadsheet Analytics",
    year: "2023",
    date: "Mar 2023",
    description:
      "Cleaned and analyzed sales data using formulas and PivotTables. Built an interactive dashboard with slicers exploring sales across Europe, North America, and the Pacific.",
    tags: ["Microsoft Excel", "PivotTables", "Formulas", "Slicers"],
    client: "Global Sales Operations",
    role: "Data Analyst",
    overview:
      "Designed and implemented a sophisticated, interactive Excel dashboard targeted at monitoring and decoding regional sales performance across Europe, North America, and the Pacific regions.",
    technologies: ["Microsoft Excel", "PivotTables", "Formulas", "Slicers", "Dashboards"],
    outcomes: [
      "Identified North America as the leading global region, driving 41.5% of total international purchases.",
      "Cleaned and modeled raw multi-region sales datasets using structured formulas and PivotTables.",
      "Built an interactive executive dashboard with dynamic slicers for intuitive drill-downs.",
      "Saved multiple hours of manual data collation each week through automated spreadsheet architecture.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/Sales-Dashboard-Excel",
  },
  {
    slug: "sales-insights-atliq-hardware",
    title: "Sales Insights — AtliQ Hardware",
    category: "Business Intelligence",
    year: "2023",
    date: "2023",
    description:
      "Created a Power BI dashboard to explore hardware sales trends and business performance.",
    tags: ["Power BI", "MySQL", "DAX", "Data Modeling"],
    client: "Hardware Manufacturing & Distribution",
    role: "BI Analyst",
    overview:
      "Created a Power BI dashboard to explore hardware sales trends and business performance. The final dashboard effectively visualized sales metrics, allowing regional sales directors to understand root causes of revenue declines and track key distributor performance.",
    technologies: ["Power BI", "MySQL", "DAX", "Power Query", "Data Modeling"],
    outcomes: [
      "Connected MySQL database with Power BI using Power Query for automated ETL data ingestion.",
      "Built star schema data models and calculated DAX measures for Revenue, Profit Margin, and Sales Volume.",
      "Created dynamic visual drill-downs by customer, product category, and regional markets.",
      "Enabled management to rapidly identify underperforming regional sales zones.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/Sales-Insights--AtliQ-Hardware",
    stars: 1,
  },
  {
    slug: "ecommerce-sales-insights",
    title: "Ecommerce Sales Insights",
    category: "E-Commerce Analytics",
    year: "2023",
    date: "2023",
    description:
      "Developed a dashboard to explore e-commerce sales performance and business trends.",
    tags: ["Power BI", "DAX", "E-Commerce", "Data Viz"],
    client: "Online Retail Platform",
    role: "Data Analyst",
    overview:
      "Developed an interactive sales dashboard by analyzing e-commerce sales data. Explored sales performance, customer buying trends, payment method preferences, and profitability across various retail product categories.",
    technologies: ["Power BI", "DAX", "Data Cleaning", "Data Visualization", "Trend Analysis"],
    outcomes: [
      "Tracked monthly sales trajectories, order counts, and Average Order Value (AOV).",
      "Identified high-performing product categories and seasonal demand surges.",
      "Evaluated payment method shares and product category return ratios.",
      "Formulated promotional suggestions focused on high-margin product segments.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/Ecommerce-Sales-Insights",
  },
  {
    slug: "sql-case-studies",
    title: "SQL Case Studies",
    category: "Querying & Modeling",
    year: "2023 – 2024",
    date: "2023 – 2024",
    description:
      "A collection of SQL practice and analytical case studies focused on querying data and solving business problems.",
    tags: ["SQL", "MySQL", "Window Functions", "CTEs"],
    client: "Technical Query Repository",
    role: "SQL Developer / Analyst",
    overview:
      "A comprehensive repository of SQL practice problems, business logic implementations, and analytical case studies focused on querying relational data and solving business problems.",
    technologies: ["SQL", "MySQL", "Window Functions", "CTEs", "Complex Joins", "Aggregations"],
    outcomes: [
      "Implemented advanced window functions (RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD).",
      "Wrote complex multi-table queries with inner, left, and full joins for customer cohort analysis.",
      "Optimized query performance by indexing key relational join attributes and eliminating redundant subqueries.",
      "Curated modular, well-commented SQL scripts addressing standard analytical and enterprise business scenarios.",
    ],
    githubUrl: "https://github.com/Sweta-Sah/SQL_CASE_STUDIES",
  },
];

export const PROJECTS_MAP: Record<string, ProjectItem> = PROJECTS.reduce(
  (acc, project) => {
    acc[project.slug] = project;
    return acc;
  },
  {} as Record<string, ProjectItem>
);
