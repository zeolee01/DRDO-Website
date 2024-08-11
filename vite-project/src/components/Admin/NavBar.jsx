import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { CiMenuFries } from "react-icons/ci"
import { motion } from "framer-motion"
import ProfileDropDown from "../Admin/ProfileDropDown copy"
import user from "../../assets/user.png"
import DRDO from "../../assets/drdo-logo.png"

const NavBar = () => {
  console.log("NavBar rendered")

  const [openProfile, setOpenProfile] = useState(false)
  const [click, setClick] = useState(false)
  const dropdownRef = useRef(null)
  const username = useSelector((state) => state.user.username)

  const handleClick = () => {
    setClick(!click)
  }

  const toggleProfileDropdown = () => {
    setOpenProfile(!openProfile)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenProfile(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white font-titillium relative z-50">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-3">
        <div className="flex items-center flex-1">
          <motion.div
            initial={{ x: "100vw", rotate: 0 }}
            animate={{ x: 0, rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <img
              className="object-cover max-w-16 max-h-16 h-16 w-16"
              src={DRDO}
              alt="Logo"
            />
          </motion.div>
        </div>
        <div className="lg:flex lg:flex-1 items-center justify-end font-normal hidden relative">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link
                to="/admin/admindashboard"
                className="text-black hover:text-emerald-200 transition border-gray-950 hover:border-emerald-200 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/admin/about1"
                className="text-black hover:text-emerald-200 transition border-teal-950 hover:border-emerald-200 cursor-pointer"
              >
                About
              </Link>

              <Link
                to="/admin/employeeroute"
                className="text-black hover:text-emerald-200 transition border-teal-950 hover:border-emerald-200 cursor-pointer"
              >
                Employee
              </Link>
              <Link
                to="/admin/librouting1"
                className="text-black hover:text-emerald-200 transition border-teal-950 hover:border-emerald-200 cursor-pointer"
              >
                Library
              </Link>
            </ul>
          </div>

          <div className="relative flex items-center" ref={dropdownRef}>
            <img
              src={user}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleProfileDropdown}
            />
            {openProfile && (
              <div className="absolute right-0 mt-2 z-50">
                <ProfileDropDown />
              </div>
            )}
            {username && (
              <div className="ml-4 text-lg font-semibold text-black">
                {username}
              </div>
            )}
          </div>
        </div>
        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  )
}

export default NavBar