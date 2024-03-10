/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "--primary": "rgba(23,49,86,1)",
        "--secondary": "rgba(255,198,58,1)",
        "--ternary": "rgba(254,140,58,1)",
        "--on-primary": "rgba(249,249,247,1)",
        "--on-secondary": "rgba(23,49,86,1)",
        "--on-ternary": "rgba(249,249,247,1)",
        "--primary-hover": "rgba(46,94,162,1)",
        "--ternary-hover": "rgba(255,176,199,1)",
        "--body-text": "rgba(23,49,86,1)",
        "--background": "rgba(249,249,247,1)",
      },
      fontFamily: {
        Anonymouse: ['"Anonymouse Pro"', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        "10px": "10px",
        "30px": "30px",
      },
      dropShadow: {
        "solid-drop": "4px 4px 0px rgba(23,49,86,1)",
      },
    },
  },
  plugins: [],
};
