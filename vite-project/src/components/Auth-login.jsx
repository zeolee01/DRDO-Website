import { useState } from "react";
import { FaUser,FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const App = () => {
  const [open,setOpen] = useState(false);

  return (
    <div className="h-[100vh] flex flex-col items-center bg-background bg-cover justify-center text-white font-font-1 ">
      <div className="h-[390px] w-80 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg rounded-lg px-6 my-4 overflow-hidden">
        <div className={`${open ? 'translate-y-[25px] translation-all': 'translate-y-[400px] translation-all'}`}>
          <h2 className="text-3xl font-bold pb-6 text-center">Register</h2>
          
          <form className="flex flex-col items-center" action="">
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent"  placeholder="Username" type="text" />
              <FaUser className="absolute top-[35%] right-3" />
            </div>
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Email" type="email" />
              <MdMail className="absolute top-[35%] right-3" />
            </div>
            
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" type="password" />
              <FaLock className="absolute top-[35%] right-3"/>
            </div>
            <button className="my-4 py-2 w-full rounded-full bg-blue-600">Register</button>
            <span className="text-[14px]">Already have an Account? <span className="font-semibold cursor-pointer" onClick={() => setOpen(!open)}>Login</span> </span>
          </form>
        </div>

        <div className={`${!open ? 'translate-y-[-250px] translation-all': 'translate-y-[400px] translation-all'}`}>
          <h2 className="text-3xl font-bold pb-6 text-center">Login</h2>
          <form className="flex flex-col items-center" action="">
            
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Email" type="email" />
              <MdMail className="absolute top-[35%] right-3" />
            </div>
            
            <div className="w-full relative">
              <input className="border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent" placeholder="Password" type="password" />
              <FaLock className="absolute top-[35%] right-3"/>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-[14px] flex gap-2">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember Me</label>
              </div>
              <span className="text-[14px]">Forget Password?</span>
            </div>
            
            <button className="my-4 py-2 w-full rounded-full bg-blue-600">Login</button>
            <span className="text-[14px]">Don't have an Account? <span className="font-semibold cursor-pointer" onClick={ () => setOpen(!open)}>Register</span> </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App
