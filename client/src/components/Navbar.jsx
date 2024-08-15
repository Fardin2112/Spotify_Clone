// navbar of website including  all music podcasts
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img onClick={()=>navigate(-1)}
            className="w-8 bg-black rounded-2xl cursor-pointer p-2"
            src={assets.arrow_left}
            alt=""
          />
          <img onClick={()=>navigate(+1)}
            className="w-8 bg-black rounded-2xl cursor-pointer p-2"
            src={assets.arrow_right}
            alt=""
          />
        </div>

        {/* <div className="flex items-center gap-4">
          <p className="bg-white text-black rounded-2xl text-[15px] px-4 py-1 hidden md:block cursor-pointer">
            Explore Premium{" "}
          </p>
          <p className=" bg-black rounded-2xl text-[15px] px-3 py-1 cursor-pointer">
            Install App{" "}
          </p>
          <p className="bg-purple-500 text-black rounded-full w-7 h-7 flex items-center justify-center">
            D
          </p>
        </div> */}
        <div>
          <button onClick={()=> navigate(`/Register`)}>Sign Up</button>
        </div>

      </div>
      <div className="mt-4 flex items-center gap-2"> 
        <p className="bg-white text-black px-4  py-1 rounded-2xl flex items-center justify-center cursor-pointer">All</p>
        <p className=" bg-black px-4 py-1 rounded-2xl flex items-center justify-center cursor-pointer">Music</p>
        <p className=" bg-black px-4 py-1 rounded-2xl flex items-center justify-center cursor-pointer">Podcasts</p>
      </div>
    </>
  );
};

export default Navbar;
