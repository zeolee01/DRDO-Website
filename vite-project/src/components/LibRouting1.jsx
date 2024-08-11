import React from "react"
import NavBar from "./Admin/NavBar"
import Footer from "./Footer"
import LibRecords from "./Admin/LibRecords"


const LibRouting1 = () => {
  return (
    <div className="bg-slate-400">
      <NavBar />
      <LibRecords/>
      <Footer />
    </div>
  )
}

export default LibRouting1
