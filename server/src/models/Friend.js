const mongoose = require("mongoose");
const { UserModel } = require("./Users");

const FriendSchema = new mongoose.Schema({
  friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  friendShipStatus: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

const FriendModel = mongoose.model("Friend", FriendSchema);

module.exports = { FriendModel };
