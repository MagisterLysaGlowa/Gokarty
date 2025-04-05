/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
const colors = require('tailwindcss/colors');

const mainColor = colors.yellow;

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px'
      },
      fontFamily: {
        jura: ["Jura", "sans-serif"],
      },
      colors: {
        'nav-selected': mainColor[500],
        'nav-default': mainColor[800],
        'nav-separator': mainColor[900],
        'main-default': mainColor[500],
        'nav-bg': 'rgba(22, 22, 22, 1)',
        'nav-bg-hover': 'rgba(22, 22, 22, 0.9)',
        'support': 'rgb(217,217,217,0.1)'
      },
      width: {
        'nav-w': "100px",

      },
      minWidth: {
        'nav-w': "100px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            warning: mainColor[500]
          },
        },
        dark: {
          colors: {
            warning: mainColor[500],
          }
        },
      },
    }),
  ],
}

