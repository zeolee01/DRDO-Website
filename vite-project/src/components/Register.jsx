import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:3002/register', {
        Email: email,
        UserName: userName,
        Password: password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center bg-background bg-cover justify-center text-white font-font-1">
      <div className="h-[409px] w-80 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 py-6 my-4 overflow-hidden">
        <h2 className="text-3xl font-bold pb-6 text-center">Register</h2>
        <form className="flex flex-col items-center" onSubmit={createUser}>
          <div className="w-full relative">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
              placeholder="Email"
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <MdMail className="absolute top-[35%] right-3" />
          </div>
          <div className="w-full relative">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
              placeholder="Username"
              id="username"
              type="text"
              onChange={(event) => setUserName(event.target.value)}
            />
            <FaUser className="absolute top-[35%] right-3" />
          </div>
          <div className="w-full relative">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"
              placeholder="Password"
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <FaLock className="absolute top-[35%] right-3" />
          </div>
          <button className="my-4 py-2 w-full rounded-full bg-blue-600" type="submit">
            <span>Register</span>
          </button>
          <span className="text-[14px]">
            Already have an Account?{" "}
            <Link to={'/'}>
              <button className="font-semibold cursor-pointer">Login</button>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;