// MongoDB
const config = require("./config/key");
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true })
const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/getvids");
var uploadRouter = require("./routes/upload");
var getvidsRouter = require("./routes/getvids");
var subsRouter = require("./routes/subs");
var commentsRouter = require("./routes/comments");
var likesRouter = require("./routes/likes");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/upload", uploadRouter);
app.use("/getvids", getvidsRouter);
app.use("/subs", subsRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

