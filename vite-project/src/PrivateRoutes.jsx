import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("AdminLoggedIn") === "true"
  return <>{isAuthenticated ? <Outlet /> : <Navigate to={"/adminlogin"} />}</>
}

export default PrivateRoutes
