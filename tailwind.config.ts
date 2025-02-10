import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        subtle: "var(--subtle)",
        contour: "var(--contour)",
      },
      boxShadow: {
        top: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        massive: "20px 20px 30px rgba(0, 0, 0, 0.5)",
      },
      dropShadow: {
        top: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        massive: "20px 20px 30px rgba(0, 0, 0, 0.5)",
      },
      padding: {
        single: "var(--spacing-single)",
        double: "var(--spacing-double)",
      },
      margin: {
        single: "var(--spacing-single)",
        double: "var(--spacing-double)",
      },
      gap: {
        single: "var(--spacing-single)",
        double: "var(--spacing-double)",
      },
      borderRadius: {
        single: "var(--spacing-single)",
      },
      height: {
        single: "var(--spacing-single)",
        double: "var(--spacing-double)",
      },
      inset: {
        single: "var(--spacing-single)",
        double: "var(--spacing-double)",
      },
    },
  },
  plugins: [],
} satisfies Config;
