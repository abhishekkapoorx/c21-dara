import {heroui} from "@heroui/theme"
// import color from 'tailwindcss/colors'
// import * as flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
// const color = require("tailwindcss/colors");
// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");
 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#ffe7a5",
          DEFAULT: "#beaf87",
          dark: "#887c5d",
        },
        primary: "#beaf87",
        secondary: "#64748B",
        accent: "#FBBF24",
        neutral: "#374151",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBD23",
        error: "#F87272",
      },
      animation: {
        move: "move 5s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
  // plugins: [heroui({
  //   addCommonColors: true,
  // })],
}
