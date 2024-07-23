import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-grey": "#333333",
        "grey": "#737373",
        "purple": "#633CFF"
      },
      backgroundColor: {
        "purple": "#633CFF",
        "light-purple": "#EFEBFF",
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
export default config;
