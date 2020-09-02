const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usrSchema = Schema({
  tenant: String,
  client_id: String,
  connection: String,
  email: String,
  password: String,
  request_language: String,
});
const Users = mongoose.model("Users", usrSchema, "users");
module.exports = { Users };

