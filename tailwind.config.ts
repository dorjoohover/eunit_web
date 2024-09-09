import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      screens: {
        xs: "475px",
        "3xl": "1800px",
      },
      colors: {
        // dark: "#05070c",
        white: "#fff",
        primary: "#1890ff", // rgb(24, 144, 255)
        secondary: "rgb(0, 21, 41)", // 001529
        bglight: "#0E2036",
        bgdark: "#001529", // rgb(0, 21, 41)
        bgGrey: "#eef0f2",
        grey: "#676767",
        dark: "#181818",
        greyNew: '#E7E5E4',
        mainBlossom: "#1d1e44",
        mainBlue: "#4b65f6",
        lightGreen: "#41d888",
        mixedBlue50: '#2850FA80',
        mixedBlue20: '#2850FA33',
      },
      gridTemplateRows: {
        layout: "repeat(auto-fill, minmax(0, 1fr))",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      backgroundImage: {
        "calc-banner": "url('/assets/utils/banner/calc-banner-blue.svg')",
      },
      gridAutoColumns: {
        "1fr": "minmax(200px, 1fr)",
      },
    },
  },
  plugins: [],
};
export default config;
