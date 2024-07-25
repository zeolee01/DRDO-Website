import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { CiMenuFries } from "react-icons/ci"

const NavBar = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-white transition">
      <ul className="text-center text-xl p-20 font-titillium">
        <Link to="/employeedashboard" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            Home
          </li>
        </Link>
        <Link to="/about2" onClick={handleClick}>
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">
            About
          </li>
        </Link>
      </ul>
    </div>
  )

  return (
    <nav className="bg-white font-titillium">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-3">
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <img
              className="object-cover max-w-16 max-h-16 h-20"
              src="src/assets/drdo-logo.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="lg:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link
                to="/employeedashboard"
                className="text-black hover:text-emerald-200 transition border-gray-950 hover:border-emerald-200 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/about2"
                className="text-black hover:text-emerald-200 transition border-teal-950 hover:border-emerald-200 cursor-pointer"
              >
                About
              </Link>
            </ul>
          </div>
          <button className="hidden md:flex gap-2 items-center border border-white px-6 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-500">
            <Link to="/employeelogin" className="flex">
              <span className="pr-2">LOG</span>
              <span> OUT</span>
            </Link>
          </button>
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
