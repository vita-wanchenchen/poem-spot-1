/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: "Email is Required",
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function (input) {
        return input.length >= 6;
      },
      "Password should be a minimum of 6 characters.",
    ],
  },
  userCreated: {
    type: Date,
    default: Date.now,
  },
  // associate poem with user
  poem: {
    type: Schema.Types.ObjectId,
    ref: "Poem",
  },
});

const NewUser = mongoose.model("NewUser", newUserSchema);

module.exports = NewUser;
