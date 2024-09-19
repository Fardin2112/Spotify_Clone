import { useState, useEffect, useContext, useRef } from "react";
import { useParams ,Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const PlaylistDetail = () => {
  const navigate = useNavigate();

  const {setSongsData,setTrack,audioRef, track,play,setButtonTrue} = useContext(PlayerContext);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allSong,setAllSong] = useState([]);
  const [clickedSongId, setClickedSongId] = useState(null)
  const [showDeleteButton,setShowDeleteButton] = useState(false);

  // Ref to track the three-dot button for the playlist delete menu
  const deleteButtonRef = useRef(null);

  // cal total length of playlist
  const getTotalDuration = (songs) => {
    let totalSeconds = 0;
  
    // Convert each song's duration from 'MM:SS' to seconds and add to totalSeconds
    songs.forEach((song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + seconds;
    });
  
    // Convert total seconds to hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    // Return a formatted string like "2 hours 30 minutes"
    return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}, ` : ''}${
      minutes} minute${minutes !== 1 ? 's' : ''}${seconds > 0 ? `, ${seconds} second${seconds !== 1 ? 's' : ''}` : ''}`;
  };
  
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

  // Fetch all songs and filter out songs that are already in the playlist
useEffect(() => {
  const getSong = async () => {
    try {
      const response = await axios.get('/api/song/list');
      
      if (response.data.success) {
        // Filter out the songs that are already in the playlist
        const filteredSongs = response.data.songs.filter(
          song => !playlistSongs.some(playlistSong => playlistSong._id === song._id)
        );
        setAllSong(filteredSongs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getSong();
}, [playlistSongs]);


  // Fetch songs from the playlist
  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      setLoading(true);
      try {
       // console.log("playlistId used in fetching playlist song",playlistId)
        const response = await axios.post(`/api/playlist/songs`,{playlistId});
        //console.log(response.data)
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
        console.log("Adding song:", { playlistId });
        const response = await axios.post("/api/playlist/add-song", {
            playlistId,
            song
        });
        console.log("Response from server:", response.data);
        alert("Song added successfully!");
        window.location.reload()
    } catch (err) {
        console.error("Failed to add song:", err);
        setError("Failed to add song.");
    } finally {
        setLoading(false);
    }
  };

  const deletePlaylist = async (playlistId) => {
    setLoading(true);
    try {
      console.log("from frontend",playlistId)
      await axios.delete(`/api/playlist/delete/${playlistId}`);
      alert("Playlist deleted successfully!");
      // Redirect or refresh
      navigate('/')
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
  // Toggle delete button visibility
  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };
  
  // delete song from playlist
  const deleteSong = async (songId) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/playlist/remove-song', {
        playlistId,
        songId
      });
      alert("Song removed successfully!");
      window.location.reload(); // Optional: Reload the page to reflect the change
    } catch (err) {
      console.error("Failed to remove song:", err);
      setError("Failed to remove song.");
    } finally {
      setLoading(false);
    }
  };
  // Add an event listener for clicks outside the delete button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteButtonRef.current && !deleteButtonRef.current.contains(event.target)) {
        setShowDeleteButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-blue-500 to-black text-white font-bold p-3">
      <div className="flex-[90%] overflow-auto">
        <Navbar />
        <div className="h-full overflow-auto">
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center mb-6">
        <img className="w-48 rounded" src={assets.playlistCover} alt="" />
        <div>
          <div className="flex justify-between items-center">
          <p>Playlist</p>
          <div className="items-end"ref={deleteButtonRef}>
          <p onClick={toggleDeleteButton} className="flex justify-end"><img className="w-10 h-10" src={assets.threeDot} alt="dot" /></p>
          {showDeleteButton && (
                  <button
                    className="text-white bg-red-500 mt-2 px-3 py-1 rounded w-36 hover:bg-red-700"
                    onClick={()=>deletePlaylist(playlistId)}
                  >
                    Delete Playlist
                  </button>
                )}
                </div>
          </div>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {playlist? playlist.playlistTitle :""}
          </h2>
          <h4>Your favourite playlist is here</h4>
          <div className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify Logo"
            />
            <b>Spotify</b> • total Songs <b>{playlistSongs?playlistSongs.length:""}</b> • about {getTotalDuration(playlistSongs)}
          </div>
        </div>
      </div>
          <hr />
          <div className="">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h1 className="text-xl lg:text-2xl ml-2 text-gray-200 mt-2 mb-2">Songs in Playlist</h1>
          {playlistSongs.length > 0 ? (
            playlistSongs.map((item, index) => (
              <div
                key={index}
                onClick={()=>handleClick(item)}
                className="grid grid-cols-4 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] mb-1"
              >
                <p className="text-white">
                  <img className="inline w-10 mr-5 lg:w-16" src={item.image} alt="" />
                </p>
                <p className="text-[15px]">{item.name}</p>
                <p className="text-center text-[15px]">{item.duration}</p>
                {/* button to delete song */}
                <div className="">
                <p
                    className="ml-8 cursor-pointer w-12 h-12 items-center flex justify-center mb-2"
                    onClick={() => setClickedSongId(item._id === clickedSongId ? null : item._id)}
                  >
                    <img className="w-10 h-10" src={assets.threeDot} alt="dot" />
                  </p>
                  {clickedSongId === item._id && (
                    <button
                      className="text-white bg-red-500 font-bold px-4 py-1 rounded hover:bg-red-700 mt-1"
                      onClick={() => deleteSong(item._id)}
                    >
                      Remove
                    </button>
                  )}
                  </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 ml-3">Add Songs in your favourite playlist from Recommended Songs</p>
          )}
          <h1 className="text-xl lg:text-2xl ml-2 text-gray-200">Recommended Songs</h1>
          {allSong.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <p className="text-white">
                <img className="inline w-10 mr-5 lg:w-16" src={item.image} alt="" />
              </p>
              <p className="text-[15px]">{item.name}</p>
              <button
                className="text-white bg-green-500 px-2 py-1 rounded hover:bg-green-700 lg:w-32"
                onClick={() => addSong(JSON.stringify(item))} // Pass songId and songLink when clicking Add
              >
                Add
              </button>
            </div>
          ))}
        </div>
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
