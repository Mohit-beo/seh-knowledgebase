import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F4E79",   // Govt blue
    success: "#2E7D32",
    warning: "#ED6C02",
    danger: "#C62828",
    border: "#E0E0E0",
    surface: "#FAFAFA",
      },
    },
  },
  plugins: [],
};

export default config;
