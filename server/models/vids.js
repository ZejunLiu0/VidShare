const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Users } = require("../models/users");

const vidSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      maxLength: 100,
    },
    description: String,
    visibility: Number,
    vidPath: String,
    category: String,
    view: {
      type: Number,
      default: 0,
    },
    duration: String,
    thumbnail: String,
    uploadDate: Date,
  },
  { timestampes: true }
);
const Video = mongoose.model("Video", vidSchema, "videos");
module.exports = { Video };
