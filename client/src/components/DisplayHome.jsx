import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongsItems from "./SongsItems";
import { PlayerContext } from "../context/PlayerContext.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";
import MyPlaylist from "./MyPlaylist.jsx";
import axios from "axios";

const DisplayHome = () => {
  const displayRef = useRef();
  const { setTrack} = useContext(PlayerContext);
  const [allSong,setAllSong] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [albumData,setAlbumData] = useState([]);

  const [albumId, setAlbumId] = useState(null);
  const [lastOpenedAlbumId, setLastOpenedAlbumId] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      try {
          const responce = await axios.get('/api/album/list')

          if (responce.data.success){
              setAlbumsData(responce.data.albums)
          }
          else {
              console.log("something went wrong in fetching album")
          }
      } catch (error) {
          console.log(error)
      }
  }
  getAlbum();
  }, []);
  
  // Handle going back to home
  const handleBack = () => {
    setLastOpenedAlbumId(albumId); // Store the current album ID before navigating back
    setAlbumId(null);
  };

  // Handle going to the last opened album
  const handleNext = () => {
    if (!albumId && lastOpenedAlbumId) {
      setAlbumId(lastOpenedAlbumId);
    }
  };

  let backgroundColor =
    albumId && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId).bgColour
      : "#121212";

  useEffect(() => {
    const getSong = async() => {
      try {
          const responce = await axios.get('/api/song/list');
  
          if (responce.data.success){
              setAllSong(responce.data.songs)
              setTrack(responce.data.songs[0])
          }
      } catch (error) {
          console.log(error)
      }
      
  }
    getSong();
    if (albumId) {
      displayRef.current.style.background = `linear-gradient(${backgroundColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  },[]);

  return (
    <div ref={displayRef} className={`w-[100%] m-2 px-6 pt-2 rounded bg-${backgroundColor} text-white overflow-auto lg:w-[75%] lg:ml-0`}>
      {!albumId ? (
        <>
          <Navbar onNextClick={handleNext} />
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto">
              {albumsData.map((item, index) => (
                <AlbumItem
                  key={index}
                  image={item.image}
                  desc={item.desc}
                  name={item.name}
                  id={item._id}
                  onclick={() => {
                    setAlbumId(item._id);
                    setAlbumData(item)
                    setLastOpenedAlbumId(item._id);
                  }}
                />
              ))}
            </div>
            <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
            <div className="flex overflow-auto">
              {allSong.map((item, index) => (
                <SongsItems 
                  key={index}
                  name={item.name}
                  image={item.image}
                  desc={item.desc} 
                  id={item._id}
                  SongitemData={item}
                  list={allSong}
                />
              ))}
            </div>
              <MyPlaylist/>
          </div>
        </>
      ) : (
        <>
          <Navbar onClick={handleBack} />
          <DisplayAlbum album={albumData} />
        </>
      )}
    </div>
  );
};

export default DisplayHome;
