const mongoose = require("mongoose");
const { UserModel } = require("./Users");

const FriendSchema = new mongoose.Schema({
  friend: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    required: false,
  },

  friendShipStatus: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

const FriendModel = mongoose.model("friend", FriendSchema);

module.exports = { FriendModel };
