import { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
//import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";
import DisplayHome from "./DisplayHome";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {
  const { audioRef, track,setTrack,setButtonTrue } = useContext(PlayerContext);
  const [songsData,setSongsData] = useState([]);
  
  useEffect(()=>{
    setButtonTrue(false)
    const getSong = async() => {
      try {
          const responce = await axios.get('/api/song/list');
  
          if (responce.data.success){
              setSongsData(responce.data.songs)
             // setTrack(responce.data.songs[0])
          }
      } catch (error) {
          console.log(error)
      }
      
  }
    getSong()
  },[setSongsData,setTrack,setButtonTrue])
  return (
    <div className="h-screen bg-black overflow-hidden">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex  ">
            <Sidebar />
            <DisplayHome />
          </div>
          <Player />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <SyncLoader
            data-testid="loader"
            aria-label="Loading Spinner"
            color="#dfdfdf"
            margin={2}
          />
        </div>
      )}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};
export default HomePage;
