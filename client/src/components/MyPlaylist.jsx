import { useFirebase } from "../context/FirebaseContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const MyPlaylist = () => {
  const navigate = useNavigate();

  const { user } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  // navigate to display playlistDetails
  const handlePlaylistClick = (playlist) => {
    navigate(`/playlist/${playlist._id}`);
  };
  

  // Function to create a new playlist
  const createPlaylist = async () => {
    if (!playlistTitle) {
      setError("Please enter a playlist title.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/playlist/create", {
        userId: user.uid,
        playlistTitle,
        songs: [],
      });
      toast.success("Playlist Created")
      //alert("Playlist created successfully!");
      fetchPlaylists(); // Refresh the playlist list after creation
      setShowCreatePlaylist(false)
    } catch (err) {
      console.error("Error creating playlist:", err);
      setError("Failed to create playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the user's playlists
  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`/api/playlist/list/${user.uid}`);
      if (response.data) {
      setPlaylists(response.data.flatMap((item) => item.playlists)); // Flatten nested playlists
      }
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError("Failed to fetch playlists. Please try again.");
    }
  };

  // Fetch playlists when the component mounts
  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <div className=" pt-4 w-full text-white flex flex-col font-sans">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">My Playlist</h1>
      <button
        onClick={() => setShowCreatePlaylist(!showCreatePlaylist)} // Toggle visibility
        className=" text-white px-4 py-2 rounded lg:w-[400px]"
      >
        {showCreatePlaylist ? <h2 className="text-lg font-semibold">Cancel</h2> : <div className="flex items-center"><img className="w-6 mr-3" src={assets.plus_icon} alt="Add playlist" /><h2 className="font-semibold text-lg">Create New</h2></div>}
      </button>
      </div>

      {showCreatePlaylist && (
        <div className="mt-5 flex w-full mb-2 items-center">
          <div className="w-[70%] mr-4">
            <input
              className="py-2 w-full px-2 text-black rounded-xl"
              type="text"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
              placeholder="Enter playlist title"
            />
          </div>
          <div className="">
            <button className="px-5 py-2 rounded-2xl bg-gray-800" onClick={createPlaylist} disabled={loading}>
              {loading ? "Creating Playlist..." : <h2 className="font-semibold text-lg">Create</h2>}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}

      {/* <h1>My Playlists</h1> */}
      <div className="flex overflow-auto">
        {playlists.map((playlist) => (
          <div
            className="min-w-[175px] max-w-[175px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
            key={playlist._id}
            onClick={() => {
              //setSelectedPlaylist(playlist);
              handlePlaylistClick(playlist);
            }}
          >
            <img className="rounded" src={assets.playlistCover} alt="AlbumCover img" />
            <h2 className="font-bold mt-2 mb-1 flex justify-center">{playlist.playlistTitle}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylist;
