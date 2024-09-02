import express from 'express';
import { createPlaylist, addSongToPlaylist,getUserPlaylists,getSongsFromPlaylist} from '../controller/playlistController.js';

const PlaylistRouter = express.Router();

// Create a new playlist
PlaylistRouter.post('/create', createPlaylist);

// Add a song to a playlist
PlaylistRouter.post('/add-song', addSongToPlaylist); // Assuming you might want to add a song via a POST request

// Get all playlists for a user
PlaylistRouter.get('/list/:userId', getUserPlaylists);

// Get all songs from a specific playlist for a user
PlaylistRouter.get('/list/:userId/:playlistId/songs', getSongsFromPlaylist);

export default PlaylistRouter;
