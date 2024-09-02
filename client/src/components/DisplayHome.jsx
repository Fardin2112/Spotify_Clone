import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongsItems from "./SongsItems";
import { PlayerContext } from "../context/PlayerContext.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";
import MyPlaylist from "./MyPlaylist.jsx";

const DisplayHome = () => {
  const displayRef = useRef();
  const { songsData, albumsData } = useContext(PlayerContext);

  const [albumId, setAlbumId] = useState(null);
  const [lastOpenedAlbumId, setLastOpenedAlbumId] = useState(null);

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
    if (albumId) {
      displayRef.current.style.background = `linear-gradient(${backgroundColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div ref={displayRef} className={`w-[100%] m-2 px-6 pt-2 rounded bg-[#${backgroundColor}] text-white overflow-auto lg:w-[75%] lg:ml-0`}>
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
                    setLastOpenedAlbumId(item._id);
                  }}
                />
              ))}
            </div>
            <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
            <div className="flex overflow-auto">
              {songsData.map((item, index) => (
                <SongsItems 
                  key={index}
                  name={item.name}
                  image={item.image}
                  desc={item.desc} 
                  id={item._id}
                />
              ))}
            </div>
            <h1 className="my-5 font-bold text-2xl">My Playlist</h1>
              <MyPlaylist/>
          </div>
        </>
      ) : (
        <>
          <Navbar onClick={handleBack} />
          <DisplayAlbum id={albumId} />
        </>
      )}
    </div>
  );
};

export default DisplayHome;
