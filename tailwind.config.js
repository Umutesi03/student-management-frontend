/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' if you prefer system settings
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a", // Green-600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#22c55e", // Green-500
          foreground: "#ffffff",
        },
        background: {
          DEFAULT: "#ffffff",
          foreground: "#020817",
        },
        muted: {
          DEFAULT: "#64748b", // Slate-500
          foreground: "#f8fafc", // Slate-50
        },
        border: "hsl(214.3 31.8% 91.4%)", // Slate-200
      },
    },
  },
  plugins: [],
}