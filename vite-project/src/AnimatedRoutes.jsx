import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AdminDashboard from './components/Admin/Dashboard'
import AdminLogin from './components/Admin/Login'
import Register from './components/Register'
import EmployeeLogin from './components/Employee/Login'
import EmployeeDashboard from './components/Employee/Dashboard'
import About1 from './components/About1'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/adminlogin" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AdminLogin /></motion.div>} />
        <Route path="/" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Register /></motion.div>} />
        <Route path="/admindashboard" element={<div><AdminDashboard /></div>} />
        <Route path="/employeelogin" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><EmployeeLogin /></motion.div>} />
        <Route path="/employeedashboard" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><EmployeeDashboard /></motion.div>} />
        <Route path="/about1" element={<div><About1 /></div>} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes