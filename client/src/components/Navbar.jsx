import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext"; // Assuming this is for auth
import { assets } from "../assets/assets";
import { useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Navbar = ({ onClick, onNextClick }) => {
  const {buttonTrue} = useContext(PlayerContext)
  const navigate = useNavigate(); 
  const { user,LogOut } = useFirebase();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect (() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="w-full flex justify-between items-center p-4 font-semibold">
      {/* Navigation buttons */}
      <div className={`flex items-center gap-2 ${!buttonTrue?"visible":"hidden"}`}>
        {/* Back Button */}
        <img
          onClick={onClick} // Go back to the previous view (e.g., homepage)
          className="w-8 h-8 bg-gray-800 rounded-full cursor-pointer p-2 hover:bg-gray-700"
          src={assets.arrow_left}
          alt="Go Back"
        />

        {/* Next Button */}
        <img
          onClick={onNextClick} // Go to the last opened album
          className="w-8 h-8 bg-gray-800 rounded-full cursor-pointer p-2 hover:bg-gray-700"
          src={assets.arrow_right}
          alt="Go Forward"
        />
      </div>

      {/* Auth buttons or user avatar */}
      {user ? (
  <div className="flex items-center gap-4 relative">
    <p className="bg-white text-black rounded-2xl text-[15px] px-4 py-1 hidden md:block cursor-pointer">
      Explore Premium
    </p>
    <p className="bg-black rounded-2xl text-[15px] px-3 py-1 cursor-pointer">
      Install App
    </p>
    <div className="relative" ref={dropdownRef}>
          <div 
            className="bg-purple-500 text-black rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
            onClick={handleDropdownToggle}
          >
            {user.displayName ? user.displayName.charAt(0) : "U"}
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={LogOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Logout
              </button>
          {/* Additional options can be added here */}
        </div>
      )}
    </div>
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
