const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema ({
    userId : {
        type : String,
        required : true
    },
    playlists : [{
        playlistTitle : {
            type : String,
            required : true,
        },
        songs : [{
            songId : {
                type :Schema.Types.ObjectId,
                ref : 'Song',
                required : true
            },
            songLink : {
                type : String,
                required : true,
            }
        }]
    }]
})

module.exports = mongoose.model('Playlist',PlaylistSchema);