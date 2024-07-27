import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminLogin from "./components/Admin/Login";
import Register from "./components/Register";
import EmployeeLogin from "./components/Employee/Login";
import EmployeeDashboard from "./components/Employee/Dashboard";
import About1 from "./components/About1";
import FileUpload from "./components/Admin/FileUpload";
import About2 from "./components/About2";


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

function AnimatedRoutes() {
  const location = useLocation();
  const username = useSelector((state) => state.user.username);

  return (
    <>
      {/* Temporarily Commented out NavBar */}
      {/* {username && <NavBar />} */}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/adminlogin"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AdminLogin />
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="/admindashboard"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <AdminDashboard username={username} />
              </motion.div>
            }
          />
          <Route
            path="/employeelogin"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <EmployeeLogin />
              </motion.div>
            }
          />
          <Route
            path="/employeedashboard"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <EmployeeDashboard />
              </motion.div>
            }
          />
          <Route
            path="/about1"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About1 />
              </motion.div>
            }
          />
          <Route
            path="/about2"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <About2 />
              </motion.div>
            }
          />
          <Route
            path="/fileupload"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <FileUpload />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;