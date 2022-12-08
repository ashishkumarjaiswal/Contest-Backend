const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contest", contestSchema);
