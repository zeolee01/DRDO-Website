import React, { useRef } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const Year = new Date().getFullYear();
    const inputRef = useRef(null);

    const handleAskHelpClick = () => {
        inputRef.current.focus();
    };

    return (
        <footer className="relative text-white bg-teal-950">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20">

                    <div className="pt-40">
                        <h3 className="text-2xl font-bold py-2 uppercase text-emerald-200 transition border-b-2 border-teal-950 hover:border-emerald-200 hover:text-white cursor-pointer">
                            NAVIGATION
                        </h3>
                        <ul className="space-y-4 text-white py-2">
                            <li className="hover:text-emerald-200 cursor-pointer">ADMIN</li>
                            <li className="hover:text-emerald-200 cursor-pointer">EMPLOYEE</li>
                            <li className="hover:text-emerald-200 cursor-pointer">NOTICE</li>
                        </ul>
                    </div>

                    <div className="mb-4 md:mb-0 pt-40">
                        <h3 className="text-2xl font-bold py-2 uppercase text-emerald-200 transition border-b-2 border-teal-950 hover:border-emerald-200 hover:text-white cursor-pointer">
                            Socials
                        </h3>
                        <div className="space-y-4 text-white py-2">
                            <p className='hover:text-emerald-200 cursor-pointer'>Email: youremail@gmail.com</p>
                            <p className='hover:text-emerald-200 cursor-pointer'>Phone: +1 113-456-7890</p>
                            <div className="flex space-x-4">
                                <a className="text-emerald-200 hover:text-white transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                                    <FaGithub />
                                </a>
                                <a className="text-emerald-200 hover:text-white transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                                    <FaLinkedinIn />
                                </a>
                                <a className="text-emerald-200 hover:text-white transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                                    <FaTwitter />
                                </a>
                                <a className="text-emerald-200 hover:text-white transform hover:scale-150 transition-all duration-150 ease-in-out" href="">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="h-full flex flex-col items-center justify-center mb-5">
                        <h2
                            className="text-2xl font-bold mb-4 text-emerald-200 transition border-b-2 border-teal-950 hover:border-emerald-200 hover:text-white cursor-pointer"
                            onClick={handleAskHelpClick}
                        >
                            Ask Help!
                        </h2>
                        <form
                            className="w-96 relative"
                            onSubmit={(e) => { e.preventDefault(); console.log("Form Submitted"); }}
                        >
                            <input 
                                type="email"
                                placeholder="Enter your query"
                                className="w-full text-gray-800 p-3 h-10 rounded-full focus:outline-none focus:border border-black"
                                ref={inputRef}
                            />
                            <button
                                type="Submit"
                                className="bg-emerald-200 px-8 py-2 rounded-full text-teal-950 absolute top-0 right-0 hover:bg-teal-950 hover:text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
