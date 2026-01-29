import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fresh Lab'O Brand Colors
        primary: {
          cyan: "#00BFFF",
          orange: "#FF8C00",
        },
        dark: {
          blue: "#1A1A4D",
          navy: "#0F1035",
        },
        accent: {
          blue: "#40E0D0",
          orange: "#FFB347",
        },
        // Semantic colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display-large": ["4.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "display-medium": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-small": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-1": ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-2": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-3": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-large": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-small": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "soft-cyan": "0 4px 20px rgba(0, 191, 255, 0.15)",
        "soft-orange": "0 4px 20px rgba(255, 140, 0, 0.15)",
        "glow-cyan": "0 0 30px rgba(0, 191, 255, 0.3)",
        "glow-orange": "0 0 30px rgba(255, 140, 0, 0.3)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 1s infinite",
        "bubble": "bubble 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bubble: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-30px) scale(1.1)", opacity: "0.8" },
          "100%": { transform: "translateY(-60px) scale(0.8)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-fresh": "linear-gradient(135deg, #00BFFF 0%, #40E0D0 100%)",
        "gradient-warm": "linear-gradient(135deg, #FF8C00 0%, #FFB347 100%)",
        "gradient-dark": "linear-gradient(135deg, #1A1A4D 0%, #0F1035 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
