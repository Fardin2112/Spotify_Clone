// this is home page for display song when you not clicking any album
import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongsItems from "./SongsItems";
import { PlayerContext } from "../context/PlayerContext.jsx";

const DisplayHome = () => {

  const {songsData,albumsData} = useContext(PlayerContext)
  return (
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
  );
};

export default DisplayHome;
