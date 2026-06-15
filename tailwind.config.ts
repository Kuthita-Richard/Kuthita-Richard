import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode
        "navy-deep": "#0B1F3A",
        navy:        "#1B3A6B",
        "navy-soft": "#2E4F87",
        paper:       "#F6F8FB",
        surface:     "#FFFFFF",
        ink:         "#16223A",
        slate:       "#5C6B7A",
        line:        "#D8DEE9",
        trace:       "#C9A24B",
        // Dark mode tokens
        "dk-bg":      "#080F1A",
        "dk-surface": "#0D1E33",
        "dk-ink":     "#E2E8F5",
        "dk-slate":   "#8896AA",
        "dk-navy":    "#4A7FD4",
        "dk-line":    "#162840",
        "dk-trace":   "#D4B05C",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body:    ['"Inter"', "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0", transform: "translateY(-6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};

export default config;
