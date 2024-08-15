import React from "react";
import { assets } from "../assets/assets";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
      {/* Logo Section */}
      <div className="w-full h-[10%] flex items-center justify-center mt-5">
        <img className="w-15 h-15" src={assets.spotify_logo} alt="Spotify Logo" />
      </div>
      
      {/* Form Section */}
      <div className="w-[90%] sm:w-[400px] h-auto sm:h-screen px-4 sm:px-8 font-sans text-white mt-5">
        <header className="flex items-center justify-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-center">Sign up to start listening</h1>
        </header>
        
        {/* Form Fields */}
        <div className="text-md mt-12">
          <div className="mb-5">
            <label className="block text-sm font-medium">Email address</label>
            <input
              className="mt-2 p-3 sm:p-5 font-semibold border-2 block w-full h-10 rounded-sm bg-transparent text-gray-200 focus:ring-2 focus:ring-green-500"
              type="email"
              required
              placeholder="name@domain.com"
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium">Password</label>
            <input
              className="mt-2 p-3 sm:p-5 font-semibold border-2 block w-full h-10 rounded-sm bg-transparent text-gray-200 focus:ring-2 focus:ring-green-500"
              type="password"
              required
              placeholder="Password"
            />
          </div>
          
          <button className="bg-green-600 rounded-3xl w-full h-10 mt-5 text-black font-semibold hover:bg-green-700 transition duration-200">Next</button>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mt-8">
          <hr className="w-[45%] border-gray-600" />
          <p className="px-3">or</p>
          <hr className="w-[45%] border-gray-600" />
        </div>

        {/* Google Signup Button */}
        <div className="mt-5">
          <button className="flex items-center justify-center border border-gray-600 w-full h-10 p-3 font-bold rounded-3xl hover:bg-gray-800 transition duration-200">
            <img className="w-6 h-6 mr-3" src={assets.GoogleLogo} alt="Google Logo" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
