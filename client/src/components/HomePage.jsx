import { useContext } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
//import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";
import DisplayHome from "./DisplayHome";
import SyncLoader from "react-spinners/SyncLoader";

const HomePage = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
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
