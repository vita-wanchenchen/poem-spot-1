const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
