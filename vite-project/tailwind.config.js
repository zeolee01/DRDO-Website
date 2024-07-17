/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('./src/assets/bg1.jpg')"
      },
      colors: {
        'primary': '#3238f2',
        'green': '#01ee91'
      },
      fontFamily: {
        'font-1': ['Poppins','sans-serif'],
        'display': ['Poppins','sans-serif'],
        'body': ['Inter','sans-serif'],
        'sans': ['"Open Sans"', 'sans-serif'],
        'titillium': ['"Titillium Web"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}