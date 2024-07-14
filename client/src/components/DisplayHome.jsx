import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import { albumsData } from "../assets/assets";
import { songsData } from "../assets/assets";
import SongsItems from "./SongsItems";

const DisplayHome = () => {
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
              id={item.id}
            />
          ))}
        </div>
        <h1 className="my-5 font-bold text-2xl">Today's biggest hit</h1>
        <div className="flex overflow-auto">
          {songsData.map((item,index)=>(<SongsItems key={index} name={item.name} image={item.image} desc={item.desc} id={item.id}/>))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
