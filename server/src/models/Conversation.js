const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  isGroup: Boolean,

  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],

  participant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  groupName: String,
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
