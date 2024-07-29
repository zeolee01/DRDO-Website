import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './ProfileCard.css';
import user from '../../assets/user.png';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function ProfileCard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/employees')
      .then(response => {
        const employeesWithDetails = response.data.map(employee => ({
          ...employee,
          job: "Software Engineer", // Replace with actual logic if needed
          // about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." // Replace with actual logic if needed
        }));
        setEmployees(employeesWithDetails);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the employee!', error);
      });
  };

  return (
    <motion.div
      className="profile-card-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {employees.map(employee => (
        <motion.div
          className="Card"
          key={employee.id}
          variants={cardVariants}
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="upper-container">
            <div className="image-container">
              <img src={user} alt='Profile' />
            </div>
          </div>
          <div className="lower-container">
            <h3>{employee.username}</h3>
            <h4>{employee.job}</h4>
            {/* <p>{employee.about}</p> */}
            {/* <button className="button">Visit Profile</button> */}
            <button className="delete-button font-bold" onClick={() => handleDelete(employee.id)}>Delete</button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProfileCard;