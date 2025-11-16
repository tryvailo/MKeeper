import type { Config } from "tailwindcss";

const config: Config = {
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
        // DearAfter Brand Colors
        brand: {
          blue: "#1E40AF", // Primary brand blue
          "blue-dark": "#164E63", // Darker blue for hover
          "blue-darker": "#1E3A8A", // Even darker for active
          green: "#10B981", // Soft green for success/positive
          "green-dark": "#059669", // Darker green for hover
        },
        text: {
          primary: "#111827", // Black for headings
          secondary: "#374151", // Dark gray for body
          tertiary: "#6B7280", // Medium gray for helper text
          light: "#9CA3AF", // Light gray for disabled
        },
        semantic: {
          error: "#DC2626",
          warning: "#F59E0B",
          success: "#10B981",
          info: "#3B82F6",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;

