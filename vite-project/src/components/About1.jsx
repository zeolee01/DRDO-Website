import React from "react"
import NavBar from "./Admin/NavBar"
import About from "./Admin/About"
import Footer from "./Footer"

const About1 = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <About />
      <Footer />
    </div>
  )
}

export default About1
