import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useFirebase } from "../context/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RegisterPage = () => {

  const navigate = useNavigate();
  const firebase = useFirebase();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // handle for signin using email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      await firebase.signupUserWithEmailandPassword(email, password);
      navigate(`/`);
      toast.info("Verification link sent to your email. Please verify to login.");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  
   
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center">
      {/* Logo Section */}
      <div className="w-full sm:h-[8%] h-[5%] flex items-center justify-center sm:mt-3 mt-1">
        <img
          className="sm:w-10 w-5 "
          src={assets.spotify_logo}
          alt="Spotify Logo"
        />
      </div>

      {/* Form Section */}
      <div className="w-[90%] sm:w-[400px] h-auto sm:h-screen px-4 sm:px-8 font-sans text-white mt-2">
        <header className="flex items-center justify-center mb-3">
          <h1 className="text-2xl sm:text-5xl font-bold text-center tracking-tighter">
            Sign up to start listening
          </h1>
        </header>

        {/* Form Fields */}
        <div className="text-md mt-8">
          <div className="mb-5">
            <label className="block text-base font-medium">Email address</label>
            <input
            onChange={ e => setEmail(e.target.value)} value={email}
              className=" border-gray-600 mt-2 p-3 sm:p-5 font-semibold border-2 block w-full h-10 rounded-sm bg-transparent text-gray-200 focus:ring-2 focus:ring-green-500"
              type="email"
              required
              placeholder="name@domain.com"
            />
          </div>

          <div className="mb-5">
            <label className="block text-base font-medium">Password</label>
            <input
            onChange={ e => setPassword(e.target.value)} value={password}
              className=" border-gray-600 mt-2 p-3 sm:p-5 font-semibold border-2 block w-full h-10 rounded-sm bg-transparent text-gray-200 focus:ring-2 focus:ring-green-500"
              type="password"
              required
              placeholder="Password"
            />
          </div>

          <button onClick={handleSubmit} className="bg-[#1ed760] rounded-3xl w-full h-10 mt-5 text-black font-semibold text-lg hover:bg-green-700 transition duration-200">
            Next
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center mt-8">
          <hr className="w-[45%] border-gray-600" />
          <p className="px-3">or</p>
          <hr className="w-[45%] border-gray-600" />
        </div>

        {/* Google Signup Button */}
        <div className="mt-5">
          <button onClick={firebase.signupUserWithGoogle} className="flex items-center justify-center border border-gray-600 w-full h-10 p-3 font-bold rounded-3xl hover:bg-gray-800 transition duration-200">
            <img
              className="w-6 h-6 mr-3"
              src={assets.GoogleLogo}
              alt="Google Logo"
            />
            Sign up with Google
          </button>
        </div>
        <div className="mt-8 flex flex-col items-center">
         
          <p className="sm:block text-gray-500 font-semibold text-lg">
            Don't Have an account?
          </p>
          <Link to="/Login"  className="sm:block font-semibold text-lg pl-1">Sign up for Spotify</Link>
        </div>
      </div>
      <footer className="w-[90%] sm:w-[400px] text-gray-500 px-4 sm:px-8 mt-3 text-xs sm:mb-5">This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.</footer>
    </div>
  );
};

export default RegisterPage;
