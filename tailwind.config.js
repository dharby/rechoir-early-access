/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Geist", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        "landing-bg": "hsl(var(--landing-bg))",
        "landing-fg": "hsl(var(--landing-fg))",
        "landing-surface": "hsl(var(--landing-surface))",
        "landing-border": "hsl(var(--landing-border))",
        "landing-muted": "hsl(var(--landing-muted))",
        accent: "hsl(var(--landing-accent))",
        "accent-fg": "hsl(var(--landing-accent-fg))",
      },
    },
  },
  plugins: [],
};
