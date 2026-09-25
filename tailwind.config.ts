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
        // Darker variant of dk-navy for white-on-navy filled buttons — the
        // base dk-navy is 3.97:1 with white text (fails WCAG AA); this hits
        // ~4.65:1 while staying close to the original hue.
        "dk-navy-btn": "#376EC4",
        "dk-line":    "#162840",
        "dk-trace":   "#D4B05C",
        // Darker gold for small body text on the light "paper" background —
        // the base "trace" gold (#C9A24B) is ~2.25:1 there and fails WCAG AA;
        // this hits 4.5:1+. Keep using "trace" for borders/icons/accents,
        // where contrast rules don't apply.
        "trace-text": "#8C6D2C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
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
