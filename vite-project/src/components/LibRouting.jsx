import React from "react"
import NavBar from "./Employee/NavBar"
import Footer from "./Footer"
import LibRecords from "./LibraryRecords/LibRecords"

const About1 = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <LibRecords />
      <Footer />
    </div>
  )
}

export default About1
