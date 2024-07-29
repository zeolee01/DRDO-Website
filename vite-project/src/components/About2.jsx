import React from "react"
import NavBar from "./Employee/NavBar"
import EmpAbout from "./Employee/About"
import Footer from "./Footer"
import LibRecords from "./LibraryRecords/LibRecords"

const About2 = () => {
  return (
    <div>
      <NavBar />
      <EmpAbout 
      
        
      />
      <h4 className="font-bold py-8">Library Records</h4>
      
      <LibRecords />
      {/* <LibRecords /> */}
      <Footer />
    </div>
  )
}

export default About2
