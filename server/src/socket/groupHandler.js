const { Conversation } = require("../models/Conversation");
const { Group } = require("../models/Group");
const { User } = require("../models/Users");
const { default: mongoose } = require("mongoose");

module.exports = (io, socket) => {
  const createGroupConversation = async (data) => {
    const { participant, groupName, user } = data;

    const index = participant.filter((item) => item === user._id);

    try {
      if (index.length !== 0) {
        socket.emit("alert", {
          stattus: 404,
          message: "Duplicate Id",
        });
        return;
      } else {
        const newParticipant = [...participant, user._id];

        const conversationId = new mongoose.Types.ObjectId();
        const groupId = new mongoose.Types.ObjectId();

        const newGroupConversation = await Conversation.create({
          _id: conversationId,
          isGroup: true,
          groupName: groupName ? groupName : `${user.username}'s group`,
          participant: newParticipant,
          group: groupId,
        });

        const newGroup = await Group.create({
          _id: groupId,
          name: groupName ? groupName : `${user.username}'s group`,
          conversation: conversationId,
          avatar: "",
          members: [],
        });

        for (const memId of newParticipant) {
          const member = await Group.findOne({ _id: newGroup._id });

          if (member) {
            newGroup.members.push({
              member: memId,
              role: memId === user._id ? "admin" : "member",
            });
          }
        }

        await newGroup.save();

        await newGroupConversation.save();

        await User.updateOne(
          { _id: user._id },
          { $push: { groups: newGroup._id } }
        );

        socket.emit("alert", {
          status: 200,
          message: "Create successfully!!",
        });
      }
    } catch (error) {
      return socket.emit("alert", {
        status: 500,
        message: "Create successfully!!",
      });
    }
  };

  socket.on("createGroupConversation", createGroupConversation);
};
