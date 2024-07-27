import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../.././index.css";
import img1 from "../../assets/About1.jpg";

const About = () => {
  const [aboutContent, setAboutContent] = useState([]);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getabout");
        setAboutContent(response.data);
      } catch (error) {
        console.error("Error fetching About Us content:", error);
      }
    };
    fetchAboutContent();
  }, []);

  return (
    <div className="about-page font-titillium">
      <div className="image-container relative w-full" style={{ height: "450px", overflow: "hidden" }}>
        <img
          src={img1}
          alt="about"
          className="w-full h-full object-cover"
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
        {aboutContent.map((item, index) => (
          <div key={index} className="mb-4">
            <p className="font-titillium text-lg leading-relaxed whitespace-pre-line">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;