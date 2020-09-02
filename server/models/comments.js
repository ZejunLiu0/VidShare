const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  vidId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
    default: null,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  date: Date,
  likes: Number,
  dislikes: Number,
  text: {
    type: String,
    maxLength: 1000,
  },
});
const Comments = mongoose.model("Comments", commentSchema);
module.exports = { Comments };
