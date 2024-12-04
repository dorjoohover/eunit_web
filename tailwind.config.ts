import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stroke: "#e7e5e4",
        main: "#2850fa",
        peach: "#fff9f5",
        red: "#ef4444",
        grey: "#7a808d",
        headBlue: "#1d1e44",
        reportInputActive: "#ced7fb",
        plat: "#ececec",
        black: "#0e0e0e",
      },
    },
  },
  plugins: [],
};
export default config;
