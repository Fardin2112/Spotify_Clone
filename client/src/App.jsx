
import axios from "axios";
import { Routes,Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import PlaylistDetails from "./pages/PlaylistDetails"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"



 // axios.defaults.baseURL = "http://localhost:4000";
 axios.defaults.baseURL = "https://spotify-clone-black-chi.vercel.app";

const App = () => {
 return (
  <>
  <Analytics/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<RegisterPage/>}/>
    <Route path="/Login" element={<LoginPage/>}/>
    <Route path="/Forgot" element={<ForgotPass/>}/>
    <Route path="/playlist/:playlistId" element={<PlaylistDetails/>}/>
  </Routes>
  <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </>

 )
};

export default App;
