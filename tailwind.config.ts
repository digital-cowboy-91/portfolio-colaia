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
        contour: "var(--contour)",
      },
      dropShadow: {
        massive: "20px 20px 30px rgba(0, 0, 0, 0.5)",
      },
      padding: {
        single: "var(--spacing-single)",
        double: "calc(var(--spacing-single) * 2)",
      },
      gap: {
        single: "var(--spacing-single)",
        double: "calc(var(--spacing-single) * 2)",
      },
      borderRadius: {
        single: "var(--spacing-single)",
      },
    },
  },
  plugins: [],
} satisfies Config;
