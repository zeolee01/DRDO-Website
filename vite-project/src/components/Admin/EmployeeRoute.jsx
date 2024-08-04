import React from "react"
import NavBar from "../Admin/NavBar"
import Footer from "../../components/Footer"
import ProfileCard from "../Admin/ProfileCard"

const EmployeeRoute = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <ProfileCard />
      <Footer />
    </div>
  )
}

export default EmployeeRoute
