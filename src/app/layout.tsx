import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishant — Creative Developer Portfolio",
  description:
    "A high-end scrollytelling portfolio showcasing creative development work. Built with Next.js, Framer Motion, and scroll-linked canvas animations.",
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
