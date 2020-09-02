var express = require("express");
var router = express.Router();
const { Comments } = require("../models/comments");
const { Users } = require("../models/users");

router.post("/", function (req, res, next) {
  console.log(req.body);

  Users.findOne({ email: req.body.author }).exec((err, record) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log(record)
    req.body.author = record._id;
    console.log(req.body)
    const comment = new Comments(req.body);
    comment.save((err, re) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});


router.post("/getComments", function (req, res, next) {
    console.log(req.body);
  
    Comments.find({ vidId: req.body.vidId, parentComment: null })
    .populate("author")
    .exec((err, comment) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        success: true,
        comment,
      });
    });
  });

module.exports = router;
