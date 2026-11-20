import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#fff3f0",
          100: "#ffe3dc",
          200: "#ffcabd",
          300: "#ffa48f",
          400: "#ff7152",
          500: "#ff4b26",
          600: "#ed2d07",
          700: "#c72103",
          800: "#a41e08",
          900: "#871e0d",
        },
        aso: {
          50: "#f8f4ff",
          100: "#f0e8ff",
          200: "#e3d4ff",
          300: "#ceb1ff",
          400: "#b380ff",
          500: "#954dff",
          600: "#7e22ce",
          700: "#581c87",
          800: "#3b0764",
          900: "#240440",
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#d4af37",
          600: "#b48a1e",
          700: "#856212",
        },
        emerald: {
          600: "#059669",
          700: "#047857",
          900: "#064e3b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

