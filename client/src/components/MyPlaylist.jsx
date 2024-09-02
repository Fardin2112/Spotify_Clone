import { useFirebase } from '../context/FirebaseContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

const MyPlaylist = () => {
    const { user } = useFirebase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [songLink, setSongLink] = useState('');

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
            console.log(response.data);
            alert('Playlist created successfully!');
            fetchPlaylists(); // Refresh the playlist list after creation
        } catch (err) {
            console.error('Error creating playlist:', err);
            setError('Failed to create playlist. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get(`/api/playlist/list/${user.uid}`);
            setPlaylists(response.data); // Correctly set the state with the fetched playlists
            console.log("my playlist", response.data); // Log the actual response data
        } catch (err) {
            console.error('Error fetching playlists:', err);
            setError('Failed to fetch playlists. Please try again.');
        }
    };

    const addSongToPlaylist = async () => {
        if (!selectedPlaylist || !songLink) {
            setError('Please select a playlist and enter a song link.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.put('/api/playlist/update', {
                userId: user.uid,
                playlistId: selectedPlaylist._id,
                songLink
            });
            console.log(response.data);
            alert('Song added successfully!');
            fetchPlaylists(); // Refresh the playlist list after adding a song
        } catch (err) {
            console.error('Error adding song to playlist:', err);
            setError('Failed to add song. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPlaylists(); // Fetch playlists when the component mounts and user is available
        }
    }, [user]); // Run the effect when user changes

    return (
        <div className='bg-gray-200 pt-4 pl-4 h-screen w-full'>
            <div className='bg-gray-200 mt-5 ml-4'>
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
            <div>
                <ul>
                    {playlists.map((playlistData, index) => (
                        playlistData.playlists.map((playlist) => (
                            <li 
                                key={`${playlistData._id}-${index}`} 
                                onClick={() => setSelectedPlaylist(playlist)}
                                style={{ cursor: 'pointer', marginBottom: '10px' }}
                            >
                                {playlist.playlistTitle}
                            </li>
                        ))
                    ))}
                </ul>

                {selectedPlaylist && (
                    <div>
                        <h2>Add Song to {selectedPlaylist.playlistTitle}</h2>
                        <input
                            type="text"
                            value={songLink}
                            onChange={(e) => setSongLink(e.target.value)}
                            placeholder="Enter song link"
                        />
                        <button onClick={addSongToPlaylist} disabled={loading}>
                            {loading ? 'Adding Song...' : 'Add Song'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPlaylist;
