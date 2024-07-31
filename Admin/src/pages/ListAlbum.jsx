import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  
  const [data,setData] = useState([]);

  const fetchAlbum = async() => {

    try {
      const responce = await axios.get(`${url}/api/album/list`);

      if(responce.data.success){
        setData(responce.data.albums);
      }
    } catch (error) {
      toast.error("Error occured")
    }
  }

  useEffect(()=>{
    fetchAlbum();
  },[])

  const removeAlbum = async (id) => {
    try {
    const responce = await axios.post(`${url}/api/album/remove`,{id})

    if (responce.data.success){
      toast.success(responce.data.message)
      await fetchAlbum();
    }
    } catch (error) {
      toast.error("Error Occured")
    }
    
  }

  return (
    <div>
      <p>All Albums</p>
      <br />
      <div >
        <div className='sm:grid hidden grid-cols-[0.8fr_0.8fr_3fr_0.8fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>BgColor</b>
          <b>Action</b>
        </div>
        {data.map((items,index)=>{
          return (
            <div key={index} className='grid  grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.8fr_0.8fr_3fr_0.8fr_0.5fr]  items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12 h-12' src={items.image} alt="" />
              <p>{items.name}</p>
              <p>{items.desc}</p>
              <p>{items.bgColour}</p>
              <p onClick={()=>{removeAlbum(items._id)}}  className='text-red-600 font-medium cursor-pointer'>Delete</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
