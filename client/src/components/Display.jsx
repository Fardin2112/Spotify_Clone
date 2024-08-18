// // this is used to mangae displayalbum and display home , when you click any album this display
// // show displayalbum and else show displayhome
// import React, { useContext, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { PlayerContext } from "../context/PlayerContext";

// const Display = () => {

//   const { albumsData } = useContext(PlayerContext);

//   const displayRef = useRef();
//   return (
//     <div
//       ref={displayRef}
//       className="w-[100%] m-2 px-6 pt-2 rounded bg-red-600 text-white overflow-auto lg:w-[75%] lg:ml-0"
//     >
//       <DisplayHome />
//     </div>
//   );
// };

// export default Display;
