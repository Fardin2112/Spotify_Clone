import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const Navbar = ({onclick}) => {
  const navigate = useNavigate();
  const { user } = useFirebase();

  return (
    <div className="w-full flex justify-between items-center p-4 font-semibold">
      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <img
          onClick={onclick}
          className="w-8 h-8 bg-gray-800 rounded-full cursor-pointer p-2 hover:bg-gray-700"
          src={assets.arrow_left}
          alt="Go Back"
        />
        <img
          onClick={() => navigate(+1)}
          className="w-8 h-8 bg-gray-800 rounded-full cursor-pointer p-2 hover:bg-gray-700"
          src={assets.arrow_right}
          alt="Go Forward"
        />
      </div>

      {/* Auth buttons or user avatar */}
      {user ? (
        <div className="flex items-center gap-4">
          <p className="bg-white text-black rounded-2xl text-[15px] px-4 py-1 hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className=" bg-black rounded-2xl text-[15px] px-3 py-1 cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            {user.displayName ? user.displayName.charAt(0) : "U"}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            className="bg-black text-gray-300 rounded-3xl px-4 py-2 font-bold hover:text-white transition transform hover:scale-105"
            onClick={() => navigate("/Register")}
          >
            Sign up
          </button>
          <button
            className="bg-white text-black rounded-3xl px-4 py-2 font-bold hover:bg-gray-200 transition transform hover:scale-105"
            onClick={() => navigate("/Login")}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
