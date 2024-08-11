import { createContext , useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    // const url = 'https://spotify-clone-black-chi.vercel.app';

    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsdata] = useState([]);
    const [track,setTrack] = useState();
    const [playStatus,setplayStatus] = useState(false);

    const [time,setTime] = useState({
        currentTime : {
            second : 0,
            minute :0
        },
        totalTime : {
            second : 0,
            minute : 0
        }
    })
    // from here we can pause and play song 
    const play = () => {
        audioRef.current.play();
        setplayStatus(true);
    }
    const pause = () => {
        audioRef.current.pause();
        setplayStatus(false);
    }
    // for play any song by click (by ID)
    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id == item._id) {
                setTrack(item)
            }
        })
        await audioRef.current.play()
        setplayStatus(true);
    }
    // this is used to previous any song
    const previous = async () => {
       
        songsData.map(async(item,index) => {
            if (item._id === track._id && index > 0) {
                
                await setTrack(songsData[index - 1])
                await audioRef.current.play();
                setplayStatus(true)
            }
        })
    }
    // this is used to next any song
    const next = async () => {

        songsData.map(async(item,index) => {
            if (item._id === track._id && index < songsData.length -1) {
                
                await setTrack(songsData[index + 1])
                await audioRef.current.play();
                setplayStatus(true)
            }
        })
    }
    // for seekbar click playing by that duration
    const seekSong = async (e)=> {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }
    const getSong = async() => {
        try {
            const responce = await axios.get('/api/song/list');

            if (responce.data.success){
                setSongsData(responce.data.songs)
                setTrack(responce.data.songs[0])
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    const getAlbum = async () => {
        try {
            const responce = await axios.get('/api/album/list')

            if (responce.data.success){
                setAlbumsdata(responce.data.albums)
            }
            else {
                console.log("something went wrong in fetching album")
            }
        } catch (error) {
            console.log(error)
        }
    }
    // logic for seekbar time
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime /audioRef.current.duration * 100)+ "%")
                setTime({
                    currentTime : {
                        second :Math.floor(audioRef.current.currentTime % 60) ,
                        minute :Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime : {
                        second : Math.floor(audioRef.current.duration % 60),
                        minute : Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        })
    },[audioRef])
    useEffect(()=>{
        getSong();
        getAlbum();
    },[])
 
    // this contextValue wrap with playercontext provider or export in all compenent  
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setplayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous , next,
        seekSong,
        songsData,albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
  )
}
export default PlayerContextProvider;


