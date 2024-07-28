import React from "react"
import { motion } from "framer-motion"
import Croucel from "../Croucel"
import Notice from "./Noitce"
import NavBar from "./NavBar"
import Footer from "../Footer"
import ImageUpload from "../ImageUpload"

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
    <div>
      <NavBar />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Croucel />
      </motion.div>
      <ImageUpload />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Notice />
      </motion.div>
      <Footer />
    </div>
  )
}

export default Home
