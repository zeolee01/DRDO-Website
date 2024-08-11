import React from "react"
import Croucel from "../Croucel"
import Noitce from "./Noitce"
import NavBar from "./NavBar"
import Footer from "../Footer"

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <div id="parent">
        <Croucel />
        <Noitce />
      </div>
      
      <Footer />
    </div>
  )
}

export default Home
