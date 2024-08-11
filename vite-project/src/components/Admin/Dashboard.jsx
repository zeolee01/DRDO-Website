import React from "react"
import { motion } from "framer-motion"
import Croucel from "../Croucel"
import Notice from "./Noitce"
import NavBar from "./NavBar"
import Footer from "../Footer"
import ImageUpload from "../ImageUpload"
import "../../index.css";

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

const Home = () => {
  return (
    <div className="h-screen overflow-y-scroll scrollbar always-visible scrollbar-thumb-gray-400 bg-gradient-to-l from-gray-700 to-black ">
      <NavBar />
      <div id="parent">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          class = "left"
        >
          <Croucel />
          <ImageUpload />

        </motion.div>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          id="right"
        >
          <Notice />
        </motion.div>
      </div>
        
      <Footer />
    </div>
  )
}

export default Home
