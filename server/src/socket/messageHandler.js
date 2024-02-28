const { Conversation } = require("../models/Conversation");
const { Message } = require("../models/Message");
const { default: mongoose } = require("mongoose");

module.exports = (io, socket) => {
  const sendMessage = async (data) => {
    const { message, consId } = await data;

    if (!data.user._id) {
      socket.emit("alert", {
        status: 404,
        message: "Something is missing!!",
      });
    } else {
      try {
        const conversation = await Conversation.findOne({ _id: consId });

        const newMessage = await Message.create({
          _id: new mongoose.Types.ObjectId(),
          message: message,
          sender: data.user._id,
          conversation: new mongoose.Types.ObjectId(),
          isRead: false,
          isSent: true,
        });

        await newMessage.save();

        const updatedConversation = await Conversation.findOneAndUpdate(
          {
            _id: conversation._id,
          },
          { $push: { messages: newMessage._id } }
        );

        await updatedConversation.save();

        socket.broadcast.to(data.consId).emit("receive-message", newMessage);
      } catch (error) {
        return socket.emit("alert", {
          status: 500,
          message: "Infernal server error",
        });
      }
    }
  };

  socket.on("send-message", sendMessage);
};
