var express = require("express");
var multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/vids");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext != ".mp4") {
      return cb(res.status(400).end("Video must be a .mp4 file"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");
const { Video } = require("../models/vids");

router.post("/", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", function (req, res, next) {
  let thumbnailPath = "";
  let fileDuration = "";
  console.dir(req);

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbnailPath = "images/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      let pathname = req.body.filePath.split("/");
      pathname.shift();
      console.log(pathname);
      let vidPath = pathname.join("/");
      return res.json({
        success: true,
        thumbnailPath: thumbnailPath,
        duration: fileDuration,
        vidPath: vidPath,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 1,
      folder: "public/images/thumbnails",
      size: "410x225",
      filename: "thumbnail-%b.png",
    });
});

router.post("/postvid", function (req, res, next) {
  console.log(req.body);
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
