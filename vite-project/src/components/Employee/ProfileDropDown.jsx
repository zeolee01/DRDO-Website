import React from 'react';
import { Link } from "react-router-dom";
import '../ProfileDropDown.css';

const ProfileDropDown = () => {
  return (
    <div className='flex flex-col ProfileDropDown'>
      <ul className='flex flex-col gap-4 font-titillium '>
        <Link className="text-black hover:translate-x-2 transition-transform duration-200">Profile</Link>
        <Link className="text-black hover:translate-x-2 transition-transform duration-200">Edit</Link>
        <Link to="/employeelogin" className="text-black hover:translate-x-2 transition-transform duration-200">Logout</Link>
      </ul>
    </div>
  );
}

export default ProfileDropDown;