import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweta Sah — Academic & Data Analytics Portfolio | Prospective Master's Candidate",
  description:
    "Data and Operations Analyst with 3+ years of experience supporting AI-enabled digital transformation initiatives in the US Insurance, Mortgage and Banking domain. Experienced in requirements analysis, business process improvement, UAT, stakeholder collaboration, workflow implementation, and production support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Subtle film-grain noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
