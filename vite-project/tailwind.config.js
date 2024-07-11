/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('./src/assets/bg1.jpg')"
      },
      fontFamily: {
        'font-1': ['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}