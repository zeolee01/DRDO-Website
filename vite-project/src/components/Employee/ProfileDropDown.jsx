import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import "../ProfileDropDown.css"

const ProfileDropDown = () => {
  const [logoutDropdown, setLogoutDropdown] = useState(false)

  const toggleLogoutDropdown = () => {
    setLogoutDropdown(!logoutDropdown)
  }

  const handleLogin = () => {
    localStorage.setItem("EmpLoggedIn", "false")
    localStorage.setItem("username", "")
  }
  return (
    <div className="flex flex-col ProfileDropDown">
      <ul className="flex flex-col gap-4 font-titillium">
        {/* <Link className="text-black hover:translate-x-2 transition-transform duration-200">
          Profile
        </Link> */}

        <div className="relative">
          <Link
            to="#"
            className="text-black hover:translate-x-2 transition-transform duration-200"
            onClick={toggleLogoutDropdown}
          >
            Logout
          </Link>
          {logoutDropdown && (
            <div className="absolute top-0 left-[-50%] mt-1 z-50 flex flex-col bg-white border border-gray-200 rounded shadow-lg">
              <Link
                to="/employeelogin"
                className="text-black px-4 py-2 hover:bg-gray-200"
                onClick={handleLogin}
              >
                Yes
              </Link>
              <button
                className="text-black px-4 py-2 hover:bg-gray-200"
                onClick={toggleLogoutDropdown}
              >
                No
              </button>
            </div>
          )}
        </div>
      </ul>
    </div>
  )
}

export default ProfileDropDown
