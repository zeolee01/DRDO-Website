import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteEmp = () => {
  const isAuthenticated = localStorage.getItem("EmpLoggedIn") === "true"
  return (
    <>{isAuthenticated ? <Outlet /> : <Navigate to={"/employeelogin"} />}</>
  )
}

export default PrivateRouteEmp
