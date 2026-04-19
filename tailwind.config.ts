import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#121212",
          50: "#1a1a1a",
          100: "#222222",
          200: "#2a2a2a",
          300: "#333333",
        },
        accent: {
          DEFAULT: "#a78bfa",
          dim: "rgba(167, 139, 250, 0.15)",
          glow: "rgba(167, 139, 250, 0.25)",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(167, 139, 250, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(167, 139, 250, 0.25)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
