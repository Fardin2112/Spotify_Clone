import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { assets } from '../assets/assets';

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    console.log(playlistId);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newSong, setNewSong] = useState('');

    console.log("this is from",playlistId)

    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true); 
            try {
                // Make sure to use the correct endpoint
                const response = await axios.get(`/api/playlist/playlist/${playlistId}`);
                setPlaylist(response.data);
            } catch (err) {
                setError('Failed to fetch playlist details.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchPlaylist();
    }, [playlistId]);

    const addSong = async () => {
        if (!newSong) {
            setError('Please enter song details.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/playlist/add-song', {
                playlistId,
                songId: newSong,
                songLink: '' // Add appropriate song link
            });
            alert('Song added successfully!');
            // Optionally, refresh playlist data
        } catch (err) {
            setError('Failed to add song.');
        } finally {
            setLoading(false);
        }
    };

    const deletePlaylist = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/playlist/delete/${playlistId}`);
            alert('Playlist deleted successfully!');
            // Redirect or refresh
        } catch (err) {
            setError('Failed to delete playlist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col bg-black text-white font-bold'>
            <div className='flex-[90%]'>
                <Navbar/>
                <div className='h-full bg-green-600'>
                    <div className='bg-red-400 w-full flex flex-col items-center lg:pl-8 pt-6 pb-6 lg:flex-row'>
                        <img className='w-[200px]' src={assets.playlistCover} alt="" />
                        <div className='flex items-center ml-5'>
                        <h1 className='text-3xl'>{playlist.playlistTitle}</h1>
                        </div>
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {playlist && (
                        <div>
                            <h1>{playlist.playlistTitle}</h1>
                            {/* Display playlist details, image, etc. */}
                            <input
                                type="text"
                                value={newSong}
                                onChange={(e) => setNewSong(e.target.value)}
                                placeholder="Enter song ID"
                            />
                            <button onClick={addSong} disabled={loading}>
                                Add Song
                            </button>
                            <button onClick={deletePlaylist} disabled={loading}>
                                Delete Playlist
                            </button>
                        </div>
                    )}
                </div>
            </div>
                <Player/>
        </div>
    );
};

export default PlaylistDetail;
