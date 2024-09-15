import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistDetail = () => {
  //const { songsData } = useContext(PlayerContext);
  const {setSongsData,setTrack,audioRef, track,play,setButtonTrue} = useContext(PlayerContext);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allSong,setAllSong] = useState([]);
  // Fetch playlist details
  useEffect(() => {
    setButtonTrue(true)
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/playlist/playlist/${playlistId}`);
        setPlaylist(response.data);
      } catch (err) {
        setError("Failed to fetch playlist details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId,setButtonTrue]);

  // all song
  useEffect(()=>{
    const getSong = async() => {
      try {
          const responce = await axios.get('/api/song/list');
  
          if (responce.data.success){
              setAllSong(responce.data.songs)
             // setTrack(responce.data.songs[0])
          }
      } catch (error) {
          console.log(error)
      }
      
  }
    getSong()
  },[])

  // Fetch songs from the playlist
  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      setLoading(true);
      try {
        console.log("playlistId used in fetching playlist song",playlistId)
        const response = await axios.post(`/api/playlist/songs`,{playlistId});
        console.log(response.data)
        setPlaylistSongs(response.data);
        setTrack(response.data[0])
      } catch (err) {
        console.log("failed to fetch playlist songs frontend", err)
        setError("Failed to fetch playlist songs.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId,setTrack,]);

  const addSong = async (song) => {
    setLoading(true);
    try {
        console.log("Adding song:", { playlistId }); // Log the song being added
        const response = await axios.post("/api/playlist/add-song", {
            playlistId,
            song
        });
        console.log("Response from server:", response.data); // Log the server's response
        alert("Song added successfully!");
        window.location.reload()
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
  const handleClick = async (song) => {
    await setSongsData(playlistSongs)
    await setTrack(song);
    play()
  }

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
          {allSong.map((item, index) => (
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
          <h1 className="text-lg text-gray-200">Songs in Playlist</h1>
          {playlistSongs.length > 0 ? (
            playlistSongs.map((item, index) => (
              <div
                key={index}
                onClick={()=>handleClick(item)}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b]"
              >
                <p className="text-white">
                  <img className="inline w-10 mr-5" src={item.image} alt="" />
                </p>
                <p className="text-[15px]">{item.name}</p>
                <p className="text-center text-[15px]">{item.duration}</p>
              </div>
            ))
          ) : (
            <p>No songs in this playlist.</p>
          )}
        </div>
      </div>
      <Player />
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default PlaylistDetail;
