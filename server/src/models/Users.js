const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: false,
  },

  avatar: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = { UserModel };
