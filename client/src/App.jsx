import axios from "axios";
import { Routes,Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import PlaylistDetails from "./pages/PlaylistDetails"
// change
import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";
import MyPlaylist from "./components/MyPlaylist";

axios.defaults.baseURL = "http://localhost:4000";

const App = () => {
 return (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<RegisterPage/>}/>
    <Route path="/Login" element={<LoginPage/>}/>
    <Route path="/Forgot" element={<ForgotPass/>}/>
    <Route path="/playlist/:playlistId" element={<PlaylistDetails/>}/>
  </Routes>
 )
};

export default App;
