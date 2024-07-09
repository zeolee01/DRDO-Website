import { useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from "react-icons/ci";

const Nav = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  }

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
      <ul className="text-center text-xl p-20">
        <Link spy={true} smooth={true} to="About">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Home</li>
        </Link>
        <Link spy={true} smooth={true} to="Admin">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">About</li>
        </Link>
        <Link spy={true} smooth={true} to="Employee">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Admin</li>
        </Link>
        <Link spy={true} smooth={true} to="Edit">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Edit</li>
        </Link>
        <Link spy={true} smooth={true} to="Notice">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Notice</li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1">
          <div className="flex flex-col items-center pt-2">
            <img className=" object-cover max-w-22 max-h-22 h-20 " src="src/assets/drdo-logo.png" alt="Logo" />
            <span className="text-lg font-medium hover:text-fuchsia-50 transition border-b-2 border-slate-900 hover:border-fuchsia-50 cursor-pointer">DRDO</span>
          </div>
        </div>
        <div className="lg:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link spy={true} smooth={true} to="About">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Home</li>
              </Link>
              <Link spy={true} smooth={true} to="Admin">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">About</li>
              </Link>
              <Link spy={true} smooth={true} to="Employee">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Admin</li>
              </Link>
              <Link spy={true} smooth={true} to="Edit">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Edit</li>
              </Link>
              <Link spy={true} smooth={true} to="Notice">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Notice</li>
              </Link>
            </ul>
          </div>
          <button className="hidden md:flex gap-2 items-center border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
            <span>LOG OUT</span>
          </button>
        </div>
        <div>
          {click && content}
        </div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
}

export default Nav; 