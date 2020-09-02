var express = require("express");
var router = express.Router();
const { Video } = require("../models/vids");
const { Subs } = require("../models/subs");
const { Users } = require("../models/users");

router.get("/", function (req, res, next) {
  Video.find()
    .populate("author")
    .exec((err, videos) => {
      if (err) {
        console.log("error!");
        console.log(err);
        return res.status(400).send(err);
      }
      console.log(videos);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  Video.findOne({ _id: req.body.vidId })
    .populate("author")
    .exec((err, vid) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        vid,
      });
    });
});

router.post("/relatedVids", function (req, res, next) {
  console.log(req.body);
  Video.find({ category: req.body.category })
    .populate("author")
    .exec((err, videos) => {
      if (err) {
        console.log("error!");
        console.log(err);
        return res.status(400).send(err);
      }
      // console.log(videos);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/getSubVids", function (req, res, next) {
  console.log(req.body);
  var fromId;
  Users.find({ email: req.body.from }).exec((err, usr) => {
    if (err) return res.status(400).send(err);
    fromId = usr[0]._id;
    console.log("fromId:", fromId);

    Subs.find({ from: fromId }).exec((err, sub) => {
      if (err) return res.status(400).send(err);
      console.log(sub);

      let subscribedUsers = [];
      sub.map((author, i) => {
        subscribedUsers.push(author.to);
      });
      Video.find({ author: { $in: subscribedUsers } })
        // Video.find({ author: subscribedUsers[0]})
        .populate("author")
        .exec((err, videos) => {
          if (err) {
            console.log(err)
            return res.status(400).send(err);
          }
          res.status(200).json({ success: true, videos });
        });
    });
  });
});

module.exports = router;
