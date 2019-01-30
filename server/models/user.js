const mongoose = require("mongoose");

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // associate poem with user
  poem: {
    type: Schema.Types.ObjectId,
    ref: "Poem",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
