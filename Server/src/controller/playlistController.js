import PlaylistModel from '../models/PlaylistModel.js';

// Create a new playlist
export const createPlaylist = async (req, res) => {
    try {
        const { userId, playlistTitle } = req.body;
        const playlist = new PlaylistModel({
            userId,
            playlists: [{ playlistTitle }]
        });
        await playlist.save();
        res.status(201).json({ message: 'Playlist created successfully', playlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a song to a playlist
export const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.body; // Assuming playlistId is sent in the body
        const { songId, songLink } = req.body;
        const playlist = await PlaylistModel.findOneAndUpdate(
            { 'playlists._id': playlistId },
            { $push: { 'playlists.$.songs': { songId, songLink } } },
            { new: true }
        );
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json({ message: 'Song added to playlist', playlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all playlists for a user
export const getUserPlaylists = async (req, res) => {
    try {
        const { userId } = req.params;
        const playlists = await PlaylistModel.find({ userId });
        if (!playlists.length) {
            return res.status(404).json({ message: 'No playlists found' });
        }
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all songs from a specific playlist for a user
export const getSongsFromPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await PlaylistModel.findOne(
            { 'playlists._id': playlistId },
            { 'playlists.$.songs': 1 } // Only return the songs field
        );
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist.playlists[0].songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
