import { response } from "express";
import PlaylistModel from "../models/PlaylistModel.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { userId, playlistTitle } = req.body;
    const playlistData = {playlistTitle,songs:[]}
    const user = await PlaylistModel.findOne({userId})
    if (user){
        user.playlists.push(playlistData)
        await user.save();
        res
        .status(201)
        .json({ message: "Playlist created successfully" });
    } else {
        const createplaylist = await PlaylistModel.create({userId,playlists:[playlistData]})
        await createplaylist.save();
        res
        .status(201)
        .json({ message: "Playlist created successfully"});
    }
    
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get specific playlist by id
export const getPlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await PlaylistModel.findOne({
      "playlists._id": playlistId,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist.playlists.id(playlistId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addSongToPlaylist = async (req, res) => {
    try {
      const { playlistId, song } = req.body;
      const SongData = JSON.parse(song); // Parse the song object from the request body
  
      if (!playlistId || !SongData._id) {
        return res.status(400).json({ message: "Playlist ID and song ID are required" });
      }
  
      // Find the playlist by playlistId
      const playlist = await PlaylistModel.findOne({
        "playlists._id": playlistId,
      });
  
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
  
      // Get the specific playlist object
      const selectedPlaylist = playlist.playlists.id(playlistId);
  
      // Check if the song already exists in the playlist by its _id
      const isSongExist = selectedPlaylist.songs.find(
        (existingSong) => existingSong._id.toString() === SongData._id.toString()
      );
      if (isSongExist) {
        return res.status(400).json({ message: "Song already exists in the playlist" });
      }
  
      // If the song does not exist, add it to the playlist
      selectedPlaylist.songs.push(SongData);
  
      await playlist.save(); // Save the updated playlist
  
      res.status(200).json({ message: "Song added to playlist", playlist });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get all playlists for a user
export const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await PlaylistModel.find({ userId });
    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all songs from a specific playlist for a user
export const getSongsFromPlaylist = async (req, res) => {
  const { playlistId } = req.body;
  console.log(playlistId);
  try {
    const playlist = await PlaylistModel.findOne(
      { "playlists._id": playlistId }
      //{ 'playlists.$.songs': 1 } // Only return the songs field
    );
    console.log(playlist);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json(playlist.playlists[0].songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
