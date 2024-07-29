import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState(""); // State for registration status

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3002/register", {
        Email: email,
        UserName: userName,
        Password: password,
      });
      setRegisterStatus(response.data.message); // Display success message
      setEmail("");
      setUserName("");
      setPassword("");
      // Reload the page after registration
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      console.error("There was an error creating the user!", error);
      setRegisterStatus(
        error.response?.data?.message || "An error occurred during registration"
      ); // Display error message
    } finally {
      // Always clear the registerStatus after a short delay (optional)
      setTimeout(() => setRegisterStatus(""), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover text-white font-font-1 fixed-background">
      <div className="bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-8 py-8 w-80">
        <h2 className="text-3xl font-bold pb-6 text-center">Employee Register</h2>
        <form className="flex flex-col items-center" onSubmit={createUser}>
          <div className="w-full relative mb-4">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 bg-transparent"
              placeholder="Email"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="w-full relative mb-4">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 bg-transparent"
              placeholder="Username"
              id="username"
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <FaUser className="absolute top-[35%] right-3" />
          </div>
          <div className="w-full relative mb-4">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 bg-transparent"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FaLock className="absolute top-[35%] right-3" />
          </div>
          <button
            className="my-4 py-2 w-full rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            <span>Register</span>
          </button>
          {registerStatus && (
            <p
              className={`mt-4 ${
                registerStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {registerStatus}
            </p>
          )}
          <p className="text-[14px] text-center">
            Already have an Account?{" "}
            <Link to={"/adminlogin"}>
              <button className="font-semibold cursor-pointer block">
                Admin Login
              </button>
            </Link>
            <Link to={"/employeelogin"}>
              <button className="font-semibold cursor-pointer block">
                Employee Login
              </button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;