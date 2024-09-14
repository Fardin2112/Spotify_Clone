import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({ album }) => {
  const {setSongsData,setTrack,play} = useContext(PlayerContext);
  
  // const { id } = useParams();

  // const { playWithId, songsData, albumsData, setSongsData } = useContext(PlayerContext);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState({});
  // const [allSong, setAllSong] = useState([]);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const response = await axios.get("/api/song/list");

        if (response.data.success) {
          const allSong = response.data.songs; // Use directly from response
          console.log(album)
          if (album) {
            setAlbumData(album);
            const filteredSongs = allSong.filter(
              (item) => item.album === album.name
            );
            console.log(filteredSongs);
            setAlbumSong(filteredSongs);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAlbum();
  },[]); // Removed dependency on allSong

  const handleOnClick = (Song) => {
    setSongsData(albumSong);
    setTrack(Song)
    play()
  }

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div>
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt="Spotify Logo"
            />
            <b>Spotify</b> • 1,222,30 likes • <b>50 songs</b>, about 2 hours 30
            min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Title</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt="Clock Icon" />
      </div>
      <hr />
      {albumSong.length > 0 ? (
        albumSong.map((item, index) => (
          <div
            onClick={()=>handleOnClick(item)}
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
            </p>
            <p className="text-[15px]">{item.name}</p>
            <p className="text-center text-[15px]">{item.duration}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default DisplayAlbum;
