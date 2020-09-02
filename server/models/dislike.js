const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = Schema({
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

const Dislikes = mongoose.model("Dislikes", dislikeSchema);
module.exports = { Dislikes };