const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  message: String,

  conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },

  sender: { type: Schema.Types.ObjectId, ref: "User" },

  // hasFile : Boolean,

  timeStamp: {
    type: Date,
    default: Date.now,
  },

  isSent: {
    type: Boolean,
    default: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };
