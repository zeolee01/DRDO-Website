/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // backgroundImage: {
      //   'background': "url('./src/assets/bg1.jpg')"
      // },
      colors: {
        primary: "#3238f2",
        green: "#01ee91",
      },
      fontFamily: {
        "font-1": ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ['"Open Sans"', "sans-serif"],
        titillium: ['"Titillium Web"', "sans-serif"],
      },
    },
  },
  // plugins: [
  //   function ({ addUtilities }) {
  //     const newUtilities = {
  //       ".scrollbar-thin": {
  //         scrollbarWidth: "thin",
  //         scrollbarColor: "rgb(31 29 29) white",
  //       },
  //       ".scrollbar-webkit": {
  //         "&::-webkit-scrollbar": {
  //           width: "8px",
  //         },
  //         "&::-webkit-scrollbar-track": {
  //           background: "white",
  //         },
  //         "&::-webkit-scrollbar-thumb": {
  //           backgroundColor: "rgb(31 41 55)",
  //           borderRadius: "20px",
  //           border: "1px solid white",
  //         },
  //       },
  //     }
  //     addUtilities(newUtilities, ["responsive", "hover"])
  //   },
  // ],
  plugins: [require("tailwind-scrollbar")],
}
