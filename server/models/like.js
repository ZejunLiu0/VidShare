const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
    },
    comentId: {
        type: Schema.Types.ObjectId,
        ref: "Comments",
    }
})

const Likes = mongoose.model("Likes", likeSchema);
module.exports = { Likes };