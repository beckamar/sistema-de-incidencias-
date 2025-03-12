/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      display: ["Poppins", "sans-serif"],
    },
    extend: {
      colors:{
        primary: "#009A49",
        second: "#FFFFFF"

      }
    },
  },
  plugins: [],
}

