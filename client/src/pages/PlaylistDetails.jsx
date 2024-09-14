import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistDetail = () => {
  const { songsData } = useContext(PlayerContext);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch playlist details
  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/playlist/playlist/${playlistId}`
        );
        setPlaylist(response.data);
      } catch (err) {
        setError("Failed to fetch playlist details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const addSong = async (song) => {
    setLoading(true);
    try {
        console.log("Adding song:", { playlistId}); // Log the song being added
        const response = await axios.post("/api/playlist/add-song", {
            playlistId,
            song
        });
        console.log("Response from server:", response.data); // Log the server's response
        alert("Song added successfully!");
    } catch (err) {
        console.error("Failed to add song:", err); // Log the error if any
        setError("Failed to add song.");
    } finally {
        setLoading(false);
    }
};

  const deletePlaylist = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/playlist/delete/${playlistId}`);
      alert("Playlist deleted successfully!");
      // Redirect or refresh
    } catch (err) {
      setError("Failed to delete playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-blue-500 to-black text-white font-bold">
      <div className="flex-[90%] overflow-auto">
        <Navbar />
        <div className="h-full overflow-auto">
          <div className="w-full flex flex-col items-center lg:pl-8 pt-6 pb-6 lg:flex-row">
            <img className="w-[200px]" src={assets.playlistCover} alt="" />
            <div className="flex items-center ml-5">
              <h1 className="text-3xl">
                {playlist ? playlist.playlistTitle : ""}
              </h1>
            </div>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h1 className="text-lg text-gray-200">Recommended Songs</h1>
          {songsData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <img className="inline w-10 mr-5" src={item.image} alt="" />
              </p>
              <p className="text-[15px]">{item.name}</p>
              <button
                className="text-white bg-green-500 px-4 py-1 rounded hover:bg-green-700"
                onClick={() => addSong(JSON.stringify(item))} // Pass songId and songLink when clicking Add
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default PlaylistDetail;
