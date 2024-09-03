import { useFirebase } from '../context/FirebaseContext';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const MyPlaylist = () => {
    const { songsData } = useContext(PlayerContext); // Use songsData from context
    const { user } = useFirebase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    

    // Function to create a new playlist
    const createPlaylist = async () => {
        if (!playlistTitle) {
            setError('Please enter a playlist title.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/playlist/create', {
                userId: user.uid,
                playlistTitle,
                songs: []
            });
            alert('Playlist created successfully!');
            fetchPlaylists(); // Refresh the playlist list after creation
        } catch (err) {
            console.error('Error creating playlist:', err);
            setError('Failed to create playlist. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch the user's playlists
    const fetchPlaylists = async () => {
        try {
            const response = await axios.get(`/api/playlist/list/${user.uid}`);
            setPlaylists(response.data.flatMap(item => item.playlists)); // Flatten nested playlists
        } catch (err) {
            console.error('Error fetching playlists:', err);
            setError('Failed to fetch playlists. Please try again.');
        }
    };

    // Function to add a song to the selected playlist
    const addSongToPlaylist = async (songId) => {
        console.log('Adding songId:', songId);
        console.log('To playlistId:', selectedPlaylist._id);
        console.log('By userId:', user.uid);
    
        if (!selectedPlaylist) {
            setError('Please select a playlist.');
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('/api/playlist/add-song', { // Make sure to use POST
                playlistId: selectedPlaylist._id,
                songId: songId, // ID of the song to add
                songLink: songsData.find(song => song._id === songId)?.file // Find the song link based on songId
            });
            console.log('API Response:', response.data);
            alert('Song added successfully!');
            fetchPlaylists();
        } catch (err) {
            console.error('API Error:', err.response ? err.response.data : err.message);
            setError('Failed to add song. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    

    // Fetch playlists when the component mounts
    useEffect(() => {
        if (user) {
            fetchPlaylists();
        }
    }, [user]);

    return (
        <div className='bg-gray-200 pt-4 pl-4 h-screen w-full text-black flex flex-col'>
            <button>Create new Playlist</button>
            <div className='bg-red-200 mt-5 ml-4'>
                <input
                    type="text"
                    value={playlistTitle}
                    onChange={(e) => setPlaylistTitle(e.target.value)}
                    placeholder="Enter playlist title"
                />
                <button onClick={createPlaylist} disabled={loading}>
                    {loading ? 'Creating Playlist...' : 'Create Playlist'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <h1>My Playlists</h1>
            <div className='bg-green-400'>
                <ul className='bg-red-600 text-black'>
                    {playlists.map((playlist) => (
                        <li key={playlist._id} onClick={() => setSelectedPlaylist(playlist)}>
                            {playlist.playlistTitle}
                        </li>
                    ))}
                </ul>

                {selectedPlaylist && (
                    <div>
                        <h2>Add Song to {selectedPlaylist.playlistTitle}</h2>
                        <ul>
                            {songsData.map((song, index) => (
                                <li key={index}>
                                    {song.name} 
                                    <button onClick={() => {console.log(song); addSongToPlaylist(song._id)}}>
                                        Add
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPlaylist;
