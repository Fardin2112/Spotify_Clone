import { createContext , useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [songsData,setSongsData] = useState([]);
   // const [albumsData,setAlbumsdata] = useState([]);
    const [track,setTrack] = useState();
    const [playStatus,setplayStatus] = useState(false);

    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });
    
    // from here we can pause and play song 
    const play = async () => {
        await audioRef.current.play();
        setplayStatus(true);
    }
    const pause = () => {
        audioRef.current.pause();
        setplayStatus(false);
    }
    // for play any song by click (by ID)
    // const playWithId = async (id) => {
    //     await songsData.map((item) => {
    //         if (id == item._id) {
    //             setTrack(item)
    //         }
    //     })
    //     await audioRef.current.play()
    //     setplayStatus(true);
    // }
    // this is used to previous any song
    const previous = async () => {
       
        songsData.map(async(item,index) => {
            if (item._id === track._id) {
                
                await setTrack(songsData[(index - 1 + songsData.length) % songsData.length] )
                await audioRef.current.play();
                setplayStatus(true)
            }
        })
    }
    // this is used to next any song
    const next = useCallback( async () => {
        const currentIndex = songsData.findIndex(item => item._id === track._id);
    
        if (currentIndex !== -1) {
            // Get the next track index
            const nextIndex = (currentIndex + 1) % songsData.length;
            const nextTrack = songsData[nextIndex];
    
            // Update the track state
            setTrack(nextTrack);
    
            // Wait for the track to be set before playing
            setTimeout(() => {
                audioRef.current.play();
                setplayStatus(true);
            }, 100); // 100ms delay to ensure state update
        }
    },[songsData,track]);
    // for seekbar click playing by that duration
    const seekSong = async (e)=> {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }
    // const getSong = async() => {
    //     try {
    //         const responce = await axios.get('/api/song/list');

    //         if (responce.data.success){
    //             setSongsData(responce.data.songs)
    //             setTrack(responce.data.songs[0])
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
        
    // }
   
    // logic for seekbar time
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleTimeUpdate = () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = `${progress}%`;
    
                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60),
                    },
                });
            };
    
            audio.addEventListener('timeupdate', handleTimeUpdate);
    
            // Cleanup on unmount
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [track]);

     // Autoplay next song when current song ends
     useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => next();
            audio.addEventListener('ended', handleEnded);

            // Cleanup on unmount
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [next]);

    // useEffect(()=>{
    //     //getSong();
    //     getAlbum();
    // },[])
 
    // this contextValue wrap with playercontext provider or export in all compenent  
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,setTrack,
        playStatus,setplayStatus,
        time,setTime,
        play,pause,
        //playWithId,
        previous , next,
        seekSong,
        songsData,
        // albumsData,
        setSongsData,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
  )
}
export default PlayerContextProvider;


