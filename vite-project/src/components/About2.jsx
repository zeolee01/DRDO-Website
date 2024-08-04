import React from "react"
import NavBar from "./Employee/NavBar"
import EmpAbout from "./Employee/About"
import Footer from "./Footer"
import LibRecords from "./LibraryRecords/LibRecords"

const About2 = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <EmpAbout />
      <h4 className="font-bold py-8">Library Records</h4>

      <LibRecords />
      {/* <LibRecords /> */}
      <Footer />
    </div>
  )
}

export default About2
