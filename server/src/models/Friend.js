const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  friendShipStatus: {
    type: String,
    enum: ["pending", "accepted", "deny"],
    default: "pending",
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = { Friend };
