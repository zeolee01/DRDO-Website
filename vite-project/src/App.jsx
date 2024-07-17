import "./App.css"
import AdminDashboard from "./components/Admin/Dashboard"
import AdminLogin from "./components/Admin/Login"
import Register from "./components/Register"
import EmployeeLogin from "./components/Employee/Login"
import EmployeeDashboard from "./components/Employee/Dashboard"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/adminlogin",
    element: (
      <div>
        <AdminLogin />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/admindashboard",
    element: (
      <div>
        <AdminDashboard />
      </div>
    ),
  },

  {
    path: "/employeelogin",
    element: (
      <div>
        <EmployeeLogin />
      </div>
    ),
  },
  {
    path: "/employeedashboard",
    element: (
      <div>
        <EmployeeDashboard />
      </div>
    ),
  },
])

function App() {
  return (
    <div className="h-full w-full pb-5">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
