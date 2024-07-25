// import React, { useState, useEffect } from "react"
// import { FaUser, FaLock } from "react-icons/fa"
// import { Link, useNavigate } from "react-router-dom"
// import Axios from "axios"

// const Login = () => {
//   const [loginUserName, setLoginUserName] = useState("")
//   const [loginPassword, setLoginPassword] = useState("")
//   const [loginStatus, setLoginStatus] = useState("")
//   const navigateTo = useNavigate()

//   useEffect(() => {
//     if (loginStatus) {
//       const timer = setTimeout(() => {
//         setLoginStatus("")
//       }, 3000) // Clear the message after 5 seconds

//       return () => clearTimeout(timer) // Clear the timeout if the component unmounts
//     }
//   }, [loginStatus])

//   const loginUser = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await Axios.post("http://localhost:3002/employeelogin", {
//         LoginUserName: loginUserName,
//         LoginPassword: loginPassword,
//       })

//       if (response.data.message) {
//         navigateTo("/")
//         setLoginStatus(response.data.message)
//       } else {
//         navigateTo("/employeedashboard")
//         setLoginStatus("Login successful")
//         // Handle successful login here (e.g., redirect, store token, etc.)
//       }
//     } catch (error) {
//       console.error("There was an error logging in!", error)
//       setLoginStatus("An error occurred during login")
//     }
//   }

//   return (
//     <div className="h-[100vh] flex flex-col items-center bg-background bg-cover justify-center text-white font-font-1">
//       <div className="h-[409px] w-80 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 py-6 my-4 overflow-hidden">
//         <h2 className="text-3xl font-bold pb-6 text-center">Employee Login</h2>
//         <form className="flex flex-col items-center" onSubmit={loginUser}>
//           <div className="w-full relative">
//             <input
//               className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
//               placeholder="Username"
//               id="username"
//               type="text"
//               onChange={(event) => setLoginUserName(event.target.value)}
//             />
//             <FaUser className="absolute top-[35%] right-3" />
//           </div>
//           <div className="w-full relative">
//             <input
//               className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
//               placeholder="Password"
//               id="password"
//               type="password"
//               onChange={(event) => setLoginPassword(event.target.value)}
//             />
//             <FaLock className="absolute top-[35%] right-3" />
//           </div>
//           <button
//             className="my-4 py-2 w-full rounded-full bg-blue-600"
//             type="submit"
//           >
//             <span>Login</span>
//           </button>
//           <p className="text-[14px]">
//             Don't have an Account?{" "}
//             <Link to={"/"}>
//               <button className="font-semibold cursor-pointer">Register</button>
//             </Link>
//           </p>
//           <p className="text-[14px]">
//             Login as admin?{" "}
//             <Link to={"/adminlogin"}>
//               <button className="font-semibold cursor-pointer">Login</button>
//             </Link>
//           </p>
//           {loginStatus && <p className="mt-4 text-black">{loginStatus}</p>}
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from "react"
import { FaUser, FaLock } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginStatus, setLoginStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const navigateTo = useNavigate()

  useEffect(() => {
    if (loginStatus) {
      const timer = setTimeout(() => {
        setLoginStatus("")
      }, 3000) // Clear the message after 3 seconds

      return () => clearTimeout(timer) // Clear the timeout if the component unmounts
    }
  }, [loginStatus])

  const loginUser = async (e) => {
    e.preventDefault()
    setIsLoading(true) // Set loading state to true

    try {
      const response = await Axios.post("http://localhost:3002/employeelogin", {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      })

      if (response.data.message) {
        navigateTo("/")
        setLoginStatus(response.data.message)
        setLoginPassword("")
      } else {
        navigateTo("/employeedashboard")
        setLoginStatus("Login successful")
        setLoginPassword("")
        setLoginUserName("")
      }
    } catch (error) {
      console.error("There was an error logging in!", error)
      setLoginStatus("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[100vh] flex flex-col items-center bg-background bg-cover justify-center text-white font-font-1">
      <div className="h-[409px] w-80 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 py-6 my-4 overflow-hidden">
        <h2 className="text-3xl font-bold pb-6 text-center">Employee Login</h2>
        <form className="flex flex-col items-center" onSubmit={loginUser}>
          <div className="w-full relative">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
              placeholder="Username"
              id="username"
              type="text"
              value={loginUserName}
              onChange={(event) => setLoginUserName(event.target.value)}
            />
            <FaUser className="absolute top-[35%] right-3" />
          </div>
          <div className="w-full relative">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
              placeholder="Password"
              id="password"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <FaLock className="absolute top-[35%] right-3" />
          </div>
          <button
            className="my-4 py-2 w-full rounded-full bg-blue-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p className="text-[14px]">
            Don't have an Account?{" "}
            <Link to={"/"}>
              <button className="font-semibold cursor-pointer">Register</button>
            </Link>
          </p>
          <p className="text-[14px]">
            Login as admin?{" "}
            <Link to={"/adminlogin"}>
              <button className="font-semibold cursor-pointer">Login</button>
            </Link>
          </p>
          {loginStatus && <p className="mt-4 text-black">{loginStatus}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
