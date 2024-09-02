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
            songId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Song',
                required: true
            },
            songLink: {
                type: String,
                required: true,
            }
        }]
    }]
});

const playlistModel = mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
export default playlistModel;
