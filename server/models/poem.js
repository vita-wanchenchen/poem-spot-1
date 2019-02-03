const mongoose = require("mongoose");

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const poemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "User",
    },
  ],
});

const Poem = mongoose.model("Poem", poemSchema);

module.exports = Poem;
