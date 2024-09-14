import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    playlists: [{
        playlistTitle: {
            type: String,
            required: true,
        },
        songs: [{
          name : { type: String, required : true},
          desc : { type: String, required : true},
          album : { type: String, required : true},
          image : { type: String, required : true},
          file : { type: String, required : true},
          duration : { type: String, required : true} 
        }]
    }]
});

const playlistModel = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
export default playlistModel;
