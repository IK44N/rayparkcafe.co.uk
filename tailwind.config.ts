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
        forest: '#2D4A2B',
        bark: '#5C4033',
        cream: '#F5F1E8',
      },
    },
  },
  plugins: [],
} satisfies Config;
