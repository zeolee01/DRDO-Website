import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPlus, FaEdit, FaSave } from "react-icons/fa";
import "../.././index.css";
import img1 from "../../assets/About1.jpg";

const About = () => {
  const [aboutContent, setAboutContent] = useState([]);
  const [newAbout, setNewAbout] = useState({ content: "" });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAbout({ ...newAbout, [name]: value });
  };

  const addOrUpdateAboutContent = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      let response;
      if (isEditing) {
        response = await axios.post(`http://localhost:3002/addabout`, {
          id: editId,
          content: newAbout.content,
        });
      } else {
        response = await axios.post("http://localhost:3002/addabout", {
          content: newAbout.content,
        });
      }
  
      if (![200, 201].includes(response.status)) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'add'} about content: ${response.statusText}`);
      }
  
      const updatedContent = isEditing
        ? aboutContent.map((item) =>
            item.id === editId ? { ...item, content: response.data.content } : item
          )
        : [...aboutContent, response.data];
  
      setAboutContent(updatedContent);
      setNewAbout({ content: "" });
      setShowForm(false);
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} About Us content:`, error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("There was a network error or unexpected issue.");
      }
    }
  };

  const editAboutContent = (item) => {
    setIsEditing(true);
    setNewAbout({ content: item.content });
    setShowForm(true);
    setEditId(item.id);
  };

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
            <button
              onClick={() => editAboutContent(item)}
              className="mt-2 flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setNewAbout({ content: "" });
          }}
          className="mt-4 flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
        >
          <FaPlus className="mr-2" /> Add Content
        </button>
        {showForm && (
          <form onSubmit={addOrUpdateAboutContent} className="mt-4">
            <textarea
              name="content"
              value={newAbout.content}
              onChange={handleInputChange}
              placeholder="Enter content"
              className="px-4 py-2 border rounded-lg w-full mb-2"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
            >
              {isEditing ? 'Update' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default About;