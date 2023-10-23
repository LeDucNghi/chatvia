const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,

  members: [
    {
      member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
      },
    },
  ],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = { Group };
