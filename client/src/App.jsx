import axios from "axios";
import { Routes,Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
// change
import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";

axios.defaults.baseURL = "https://spotify-clone-black-chi.vercel.app";

const App = () => {
 return (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<RegisterPage/>}/>
    <Route path="/Login" element={<LoginPage/>}/>
    <Route path="/Forgot" element={<ForgotPass/>}/>
  </Routes>
 )
};

export default App;
