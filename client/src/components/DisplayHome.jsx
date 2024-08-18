// this is home page for display song when you not clicking any album
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongsItems from "./SongsItems";
import { PlayerContext } from "../context/PlayerContext.jsx";
import DisplayAlbum from "./DisplayAlbum.jsx";

const DisplayHome = () => {
  const displayRef = useRef();
  

  const {songsData,albumsData} = useContext(PlayerContext)

  const [albumId,setAlbumId] = useState(null);
  let backgroundColor =
    albumId && albumsData.length > 0
      ? albumsData.find((x) => x._id == albumId).bgColour
      : "#121212";
  console.log(backgroundColor)
  useEffect(() => {
    if (albumId) {
      displayRef.current.style.background = `linear-gradient(${backgroundColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <>
    <div ref={displayRef} className={`w-[100%] m-2 px-6 pt-2 rounded bg-[#${backgroundColor}] text-white overflow-auto lg:w-[75%] lg:ml-0`}>
      
      {!albumId ? (
        <>
        <Navbar />
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
              onclick={()=> setAlbumId(item._id)}
            />
          ))}
        </div>
        <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
        <div className="flex overflow-auto">
          {songsData.map((item,index)=>(
            <SongsItems 
              key={index}
              name={item.name}
              image={item.image}
              desc={item.desc} 
              id={item._id}/>))}
        </div>
      </div>
      </>
      ) :
      <>
      <Navbar onclick={()=>setAlbumId(null)} />
      <DisplayAlbum id={albumId}/>
      </>
      } 
    </div>  
    </>
  );
};

export default DisplayHome;
