import { createContext , useEffect, useRef, useState } from 'react'
import { songsData } from '../assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track,setTrack] = useState(songsData[2]);
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
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setplayStatus(true);
    }
    // this is used to previous any song
    const previous = async () => {
        if (track.id > 0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setplayStatus(true);
        }
    }
    // this is used to next any song
    const next = async () => {
        if (track.id < songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setplayStatus(true);
        }
    }
    // for seekbar click playing by that duration
    const seekSong = async (e)=> {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }
    // logic for seekbar time
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () =>{
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
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
  )
}
export default PlayerContextProvider;


