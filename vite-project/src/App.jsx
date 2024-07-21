import React from 'react'
import "./App.css"
import { BrowserRouter as Router } from "react-router-dom"
import AnimatedRoutes from './AnimatedRoutes'

function App() {
  return (
    <div className="h-full w-full pb-5">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App