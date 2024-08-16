import react from "react";
import { assets } from "../assets/assets";

const ForgotPage = () => {
  return (
    <div className="flex flex-col bg-black w-full h-screen text-white">
      {/* Logo of spotify and name */}
      <div className="flex mt-5 ml-5 items-center">
        <img src={assets.spotify_logo} alt="Spotify_Logo" />
        <h1 className="text-white text-2xl font-sans font-semibold ml-1 tracking-tighter">
          Spotify
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[90%] sm:w-[400px] h-screen sm:h-screen px-4 sm:px-8 font-sans text-white mt-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-white text-lg mt-5 font-semibold tracking-tight">
            Enter the email address or username linked to your Spotify account
            and we'll send you an email.
          </p>

          <div className="mt-5">
            <label className="block text-base font-medium">Email</label>
            <input
              className="mt-2 p-3 sm:p-5 font-semibold border-2  border-gray-600 block w-full h-10 rounded-sm bg-transparent text-gray-200 focus:ring-2 focus:ring-green-500"
              type="email"
              required
            />
          </div>

          <button className="bg-[#1ed760] rounded-3xl w-full py-3 mt-8 text-black font-semibold text-lg hover:bg-green-700 transition duration-200">
            Send Link
          </button>
          <div className="flex justify-end items-end">
          <p className=" text-gray-500 text-xs mt-8 ">This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.</p>
          </div>
        </div>  
      </div>
    </div>
  );
};
export default ForgotPage;
