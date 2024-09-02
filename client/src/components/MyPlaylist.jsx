import { useFirebase } from '../context/FirebaseContext';
import axios from 'axios';
import { useState } from 'react';

const MyPlaylist = () => {
    const { user } = useFirebase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playlistTitle, setPlaylistTitle] = useState('');

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
                playlistTitle:'My playlist',
                songs: []
            });
            console.log(response.data);
            alert('Playlist created successfully!');
        } catch (err) {
            console.error('Error creating playlist:', err);
            setError('Failed to create playlist. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
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
    );
};

export default MyPlaylist;
