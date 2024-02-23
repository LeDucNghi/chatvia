const { default: mongoose } = require("mongoose");
const { Group } = require("../models/Group");
const { User } = require("../models/Users");
const { Conversation } = require("../models/Conversation");

module.exports = (io, socket) => {
  const createGroupConversation = async (data) => {
    const { participant, groupName, user } = data;

    const index = participant.filter((item) => item === user._id);
    const participantId = participant.map((user) => {
      return user._id;
    });
    const newParticipantId = [...participantId, user._id];
    console.log(
      "🚀 ~ createGroupConversation ~ newParticipantId:",
      newParticipantId
    );

    try {
      if (index.length !== 0) {
        return socket.emit("alert", {
          status: 404,
          message: "Duplicate Id",
        });
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

        // data.participant.map((user) => {
        socket.broadcast.to([participantId]).emit("new-room", {
          room: newGroup,
        });
        // });
      }
    } catch (error) {
      return socket.emit("alert", {
        status: 500,
        message: "Infernal server error",
        response: error,
      });
    }
  };

  socket.on("join-room", (data) => {
    const recentRoom = data.recentRooms.map((room) => {
      return room._id;
    });

    const newRoom = [...recentRoom, data.selfRoom];

    newRoom.map((room) => socket.join(room));
  });

  socket.on("self-room", (data) => {
    socket.join(data.room);
  });

  socket.on("createGroupConversation", createGroupConversation);
};
