// how songs will be present in web
import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongsItems = ({name,image,desc,id,SongitemData,list}) => {

  const {setSongsData,setTrack,play} = useContext(PlayerContext);
  const handleOnClick = () => {
    setSongsData(list);
    setTrack(SongitemData)
    play()
  }

  return (
    <div onClick={handleOnClick} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={image} alt="" />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongsItems
