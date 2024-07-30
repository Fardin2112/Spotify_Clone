import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListSong = () => {

  const [data,setData] = useState([]);

  const fetchSong = async () =>  {
    try {
      const responce = await axios.get(`${url}/api/song/list`);
      
      if (responce.data.success){
        setData(responce.data.songs)
      }
      console.log(data)
      
    } catch (error) {
      toast.error("Error Occurred")   
    }   
  }
  useEffect(()=>{
    fetchSong();
  },[])

  const removeSong = async (id) => {
    try {
      const responce = await axios.post(`${url}/api/song/remove`,{id})

      if (responce.data.success){
        toast.success(responce.data.message);
        await fetchSong() ;
      }
    } catch (error) {
      toast.error("Error Occured")
    }
  }
  return (
    <div>
      <p>All Song</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Duration</b>
            <b>Action</b>
        </div>
        {data.map((items, index)=>{
          return (
            <div key={index} className='grid  grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]  items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
              <img className='w-12' src={items.image} alt="" />
              <p>{items.name}</p>
              <p>{items.album}</p>
              <p>{items.duration}</p>
              <p onClick={()=>removeSong(items._id)} className='text-red-600 font-medium cursor-pointer'>Delete</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListSong
