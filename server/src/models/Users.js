const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  },

  email: {
    type: String,
  },

  avatar: {
    type: String,
  },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],

  blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
