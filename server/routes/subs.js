var express = require("express");
var router = express.Router();
const { Subs } = require("../models/subs");
const { Users } = require("../models/users");

router.post("/isSubscribed", function (req, res, next) {
  console.log(req.body)

  Users.find({ email: req.body.to }).exec((err, usrTo) => {
    if (err) return res.status(400).send(err);

    if (usrTo.length!=0) {
      let toId = usrTo[0]._id;
      Users.find({ email: req.body.from }).exec((err, usrFrom) => {
        if (err) return res.status(400).send(err);
  
        let fromId = usrFrom[0]._id;
  
        Subs.find({ to: toId, from: fromId }).exec((err, record) => {
          //   Subs.find({ to: req.body.to, from: req.body.from }).exec((err, record) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          let subd = false;
          if (record.length != 0) subd = true;
          res.status(200).json({ success: true, subscribed: subd });
        });
      });
    } else {
      res.status(200).json({ success: true, subscribed: false });
    }
  });
});

router.post("/numSub", function (req, res) {
  console.log("numSub", req.body);
  var toId;
  Users.find({ email: req.body.to }).exec((err, usrTo) => {
    if (err) return res.status(400).send(err);

    toId = usrTo[0]._id;
    console.log("to:", toId);
    Subs.find({ to: toId }).exec((err, record) => {
      // Subs.find({ to: req.body.to }).exec((err, record) => {
      if (err) {
        console.log("error!");
        console.log(err);
        return res.status(400).send(err);
      }
      res.status(200).json({ success: true, numSubs: record.length });
    });
  });
});

router.post("/unsubscribe", function (req, res) {
  Users.find({ email: req.body.to }).exec((err, usrTo) => {
    if (err) return res.status(400).send(err);

    let toId = usrTo[0]._id;
    Users.find({ email: req.body.from }).exec((err, usrFrom) => {
      if (err) {
        return res.status(400).send(err);
      }
      let fromId = usrFrom[0]._id;
      Subs.findOneAndDelete({ to: toId, from: fromId }).exec((err, re) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, re });
      });
    });
  });
});

router.post("/subscribe", function (req, res) {
  Users.find({ email: req.body.to }).exec((err, usrTo) => {
    if (err) {
      return res.status(400).send(err);
    }
    let toId = usrTo[0]._id;
    Users.find({ email: req.body.from }).exec((err, usrFrom) => {
      if (err) {
        return res.status(400).send(err);
      }
      let fromId = usrFrom[0]._id;

      Subs.find({ to: toId, from: fromId }).exec((err, record) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (record.length != 0) {
          return res
            .status(200)
            .json({ success: false, msg: "Already subscribed." });
        }

        const subscribe = new Subs({ to: toId, from: fromId });
        subscribe.save((err, re) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true });
        });
      });
    });
  });
});

module.exports = router;
