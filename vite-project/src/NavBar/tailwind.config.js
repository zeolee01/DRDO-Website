/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'primary': '#3238f2',
        'green': '#01ee91'
      },
      fontFamily: {
        'display': ['Poppins','sans-serif'],
        'body': ['Inter','sans-serif']
      }
    },
  },
  plugins: [],
}
