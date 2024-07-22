import React from "react";
import { motion } from "framer-motion";
import "../index.css";
import img1 from "../assets/About1.jpg";

const About = () => {
  return (
    <div className="about-page font-titillium">
      <div className="image-container relative">
        <img
          src={img1}
          alt="about"
          className="image w-full h-full object-cover"
        />
        <motion.div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 text-white text-6xl font-titillium font-semibold"
          initial={{ x: -200 }}
          animate={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          About Us
        </motion.div>
      </div>
      <div className="content-container p-6 bg-white">
        <h2 className="text-2xl font-titillium font-semibold mb-4">About Us</h2>
        <p className="font-titillium text-lg leading-relaxed">
          Established in 1958, the Defence Research and Development Organisation
          (DRDO) is India’s premier research and development organization in
          defense technology and systems. DRDO spearheads innovations ranging
          from missile systems to aeronautics, electronics, and advanced
          materials, ensuring India’s self-reliance in defense technology and
          bolstering its strategic capabilities.
        </p>
        <p className="font-titillium text-lg leading-relaxed mt-4">
          Driven by a mission to empower India’s armed forces with cutting-edge
          technology, DRDO collaborates extensively with academic institutions,
          industry partners, and international entities. Its diverse portfolio
          includes the development of sophisticated radar systems,
          cyber-security solutions, and advanced combat vehicles. DRDO’s
          relentless pursuit of excellence continues to elevate India’s stature
          as a global leader in defense innovation.
        </p>
        <p className="font-titillium text-lg leading-relaxed mt-4">
          This addition highlights DRDO’s collaborative efforts and broader
          impact on defense technology advancement.
        </p>
      </div>
    </div>
  );
};

export default About;