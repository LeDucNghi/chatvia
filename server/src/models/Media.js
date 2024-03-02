const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  types: {
    type: String,
    enum: ["image", "file"],
    default: "image",
  },

  file: String,
});

const Media = mongoose.model("Media", MediaSchema);

module.exports = { Media };
