import axios from "axios";
import { Routes,Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegisterPage from "./pages/Register";

axios.defaults.baseURL = "https://spotify-clone-black-chi.vercel.app";

const App = () => {
 return (
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/Register" element={<RegisterPage/>}/>
  </Routes>
 )
};

export default App;
