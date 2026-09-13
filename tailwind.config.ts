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
        pearl: {
          bg: "#F5F1E8",
          surface: "#FAF7F2",
          card: "#EFECE4",
          border: "#E2DDD2",
          "border-light": "#EAE5DA",
          gold: "#C9A961",
          "gold-light": "#DFC380",
          "gold-dark": "#A6863C",
          espresso: "#1C1917",
          taupe: "#44403C",
          "taupe-muted": "#78716C",
          sand: "#E5DEC9",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        ultra: "0.35em",
      },
      animation: {
        "subtle-pulse": "subtlePulse 4s ease-in-out infinite",
        "slow-spin": "spin 40s linear infinite",
      },
      keyframes: {
        subtlePulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
