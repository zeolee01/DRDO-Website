import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { CiMenuFries } from "react-icons/ci"
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

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-white transition z-40">
      <ul className="text-center text-xl p-20 font-titillium">
        <Link to="/admin/admindashboard" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Home
          </li>
        </Link>
        <Link to="/admin/about1" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            About
          </li>
        </Link>

        <Link to="/admin/EmployeeRoute" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Employee
          </li>
        </Link>

        <Link to="/admin/notice" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Notice
          </li>
        </Link>
      </ul>
    </div>
  )

  return (
    <nav className="bg-white font-titillium relative z-50">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-3">
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <img
              className="object-cover max-w-16 max-h-16 h-16 w-16"
              src={DRDO}
              alt="Logo"
            />
          </div>
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

              {/* <Link
                to="/admin/notice"
                className="text-black hover:text-emerald-200 transition border-teal-950 hover:border-emerald-200 cursor-pointer"
              >
                Notice
              </Link> */}
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
