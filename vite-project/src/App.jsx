import "./App.css"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"

// import AuthLogin from "./components/AuthLogin"

import  {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path:'/register',
    element: <div><Register /></div>
  },
  {
    path:'/dashboard',
    element: <div><Dashboard /></div>
  }
])

function App() {
  return (
    <div className="bg-teal-950 h-full w-full pb-5">
      {/* <AuthLogin /> */}
      {/* <Login />
      <Register />
      <Home /> */}
      {/* <Login /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App
