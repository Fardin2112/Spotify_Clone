import { response } from "express";
import PlaylistModel from "../models/PlaylistModel.js";
import playlistModel from "../models/PlaylistModel.js";

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
  try {
    const playlist = await PlaylistModel.findOne(
      { "playlists._id": playlistId },
    );
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json(playlist.playlists[0].songs);
  } catch (error) {
    console.log("failed to fetch playlist song ", error)
    res.status(500).json({ error: error.message });
  }
};

// delete a Song from playlist
export const deleteSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    //console.log("Request to delete song", playlistId, songId);

    // Find the playlist by playlistId
    const playlist = await PlaylistModel.findOne({
      "playlists._id": playlistId,
    });

    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }

    // Get the specific playlist object
    const selectedPlaylist = playlist.playlists.id(playlistId);

    if (!selectedPlaylist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }

    // Find the index of the song in the playlist
    const songIndex = selectedPlaylist.songs.findIndex(
      (song) => song._id.toString() === songId
    );

    if (songIndex === -1) {
      return res.status(404).json({ success: false, message: "Song not found in the playlist" });
    }

    // Remove the song from the playlist
    selectedPlaylist.songs.splice(songIndex, 1);

    // Save the updated playlist
    await playlist.save();

    res.status(200).json({ success: true, message: "Song removed from playlist successfully" });
  } catch (error) {
    console.error("Error deleting song from playlist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// delete playlist
export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    console.log("Playlist ID:", playlistId);

    // Find the document containing the playlist
    const playlist = await PlaylistModel.findOne({
      "playlists._id": playlistId,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Find the index of the playlist to be deleted within the user's playlists array
    const index = playlist.playlists.findIndex(
      (p) => p._id.toString() === playlistId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Remove the playlist using the index
    playlist.playlists.splice(index, 1);

    // Save the updated document
    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting playlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete playlist",
      error,
    });
  }
};



