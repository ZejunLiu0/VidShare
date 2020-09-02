var express = require("express");
var router = express.Router();
const { Video } = require("../models/vids");
const { Subs } = require("../models/subs");
const { Users } = require("../models/users");
const { Likes } = require("../models/like");
const { Dislikes } = require("../models/dislike");

router.post("/getLikeNum", function (req, res) {
  //   console.log("getLikeInfo:", req.body);
  Likes.find({ videoId: req.body.vidId }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    Dislikes.find({ videoId: req.body.vidId }).exec((err, dislikes) => {
      if (err) return res.status(400).send(err);
      console.log("dis:",dislikes.length)
      console.log("like:",likes.length)
      return res.status(200).json({
        success: true,
        likes: likes.length,
        dislikes: dislikes.length,
      });
    });
  });
});

router.post("/getUserLikedVid", function (req, res) {
  Users.find({ email: req.body.userBrowsing }).exec((err, user) => {
    if (err) return res.status(400).send(err);

    let usrId = user[0]._id;
    Likes.find({ videoId: req.body.vidId, userId: usrId }).exec(
      (err, records) => {
        if (err) return res.status(400).send(err);
        return res
          .status(200)
          .json({ success: true, liked: records.length != 0 });
      }
    );
  });
});

router.post("/getUserDisikedVid", function (req, res) {
  Users.find({ email: req.body.userBrowsing }).exec((err, user) => {
    if (err) return res.status(400).send(err);

    let usrId = user[0]._id;
    Dislikes.find({ videoId: req.body.vidId, userId: usrId }).exec(
      (err, records) => {
        if (err) return res.status(400).send(err);
        return res
          .status(200)
          .json({ success: true, disliked: records.length != 0 });
      }
    );
  });
});

router.post("/liked", function (req, res) {
  console.log(req.body);

  Users.find({ email: req.body.userEmail }).exec((err, user) => {
    if (err) return res.status(400).send(err);

    let usrId = user[0]._id;
    const like = new Likes({
      userId: usrId,
      videoId: req.body.vidId,
      commentId: req.body.commentId,
    });

    switch (req.body.type) {
      // hit like when disliked, delete record from dislike, add to like
      case 1:
        console.log("???");

        Dislikes.findOneAndDelete({
          userId: usrId,
          videoId: req.body.vidId,
        }).exec((err, re) => {
          if (err) return res.status(400).json({ success: false, err });
          like.save((err, re) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true });
          });
          //   res.status(200).json({ success: true, re });
        });
        break;

      // hit like when liked, delete record from like
      case 2:
        Likes.findOneAndDelete({ userId: usrId, videoId: req.body.vidId }).exec(
          (err, re) => {
            if (err) return res.status(400).json({ success: false, err });
            like.save((err, re) => {
              if (err) return res.status(400).json({ success: false, err });
              return res.status(200).json({ success: true });
            });
          }
        );
        break;

      // add record to like
      case 3:
        like.save((err, re) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true });
        });
        break;
      default:
        console.log("unknown state");
    }
  });
});

router.post("/disliked", function (req, res) {
  console.log(req.body);

  Users.find({ email: req.body.userEmail }).exec((err, user) => {
    if (err) return res.status(400).send(err);

    let usrId = user[0]._id;
    const dislike = new Dislikes({
      userId: usrId,
      videoId: req.body.vidId,
      commentId: req.body.commentId,
    });

    switch (req.body.type) {
      // hit dislike when liked, delete record from like, add to dislike
      case 1:
        console.log("???");

        Likes.findOneAndDelete({ userId: usrId, videoId: req.body.vidId }).exec(
          (err, re) => {
            if (err) return res.status(400).json({ success: false, err });
            dislike.save((err, re) => {
              if (err) return res.status(400).json({ success: false, err });
              return res.status(200).json({ success: true });
            });

            // res.status(200).json({ success: true, re });
          }
        );
        break;

      // hit dislike when disliked, delete record from dislike
      case 2:
        Dislikes.findOneAndDelete({
          userId: usrId,
          videoId: req.body.vidId,
        }).exec((err, re) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).json({ success: true, re });
        });
        break;

      // add record to dislike
      case 3:
        dislike.save((err, re) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true });
        });
        break;
      default:
        console.log("unknown state");
    }
  });
});

module.exports = router;
