const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    minlength: 1,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Poem = mongoose.model("Poem", poemSchema);

module.exports = Poem;
