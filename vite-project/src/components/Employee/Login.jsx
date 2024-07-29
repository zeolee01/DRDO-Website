import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { setUsername } from "./actions/userActions";

const EmployeeLogin = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("EmpLoggedIn", "false");
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3002/employeelogin", {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      });

      if (response.data.message) {
        setLoginStatus(response.data.message);
        setLoginPassword("");
        setLoginUserName("");
      } else {
        dispatch(setUsername(loginUserName)); 
        navigate("/emp/employeedashboard");
        localStorage.setItem("EmpLoggedIn", "true");
        setLoginStatus("Login successful");
        setLoginPassword("");
        setLoginUserName("");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setLoginStatus("An error occurred during login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover text-white font-font-1 fixed-background">
      <div className="bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 py-6 w-80">
        <h2 className="text-3xl font-bold pb-6 text-center">Employee Login</h2>
        <form className="flex flex-col items-center" onSubmit={loginUser}>
          <div className="w-full relative mb-4">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 bg-transparent"
              placeholder="Username"
              id="username"
              type="text"
              value={loginUserName}
              onChange={(event) => setLoginUserName(event.target.value)}
            />
            <FaUser className="absolute top-[35%] right-3" />
          </div>
          <div className="w-full relative mb-4">
            <input
              className="border border-gray-200 w-full rounded-full py-2 px-4 bg-transparent"
              placeholder="Password"
              id="password"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <FaLock className="absolute top-[35%] right-3" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 w-full rounded-full py-2 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            <span>Log In</span>
          </button>
          <br />
          <br />
          <p className="text-[14px]">
            Don't have an Account?{" "}
            <Link to={"/"}>
              <button className="font-semibold cursor-pointer">Register</button>
            </Link>
          </p>
          <p className="text-[14px]">
            Login as admin?{" "}
            <Link to={"/adminlogin"}>
              <button className="font-semibold cursor-pointer">Login</button>
            </Link>
          </p>
          {loginStatus && <p className="mt-4 text-red-500">{loginStatus}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;