const { Conversation } = require("../models/Conversation");
const { Message } = require("../models/Message");
const { default: mongoose } = require("mongoose");

module.exports = (io, socket) => {
  const sendMessage = async (data) => {
    const { message, consId, image } = await data;
    console.log("🚀 ~ sendMessage ~ { message, consId, image }:", {
      message,
      consId,
      image,
    });

    // if (!data.user._id) {
    //   socket.emit("alert", {
    //     status: 404,
    //     message: "Something is missing!!",
    //   });
    // } else {
    //   try {
    //     const conversation = await Conversation.findOne({ _id: consId });

    //     const newMessage = await Message.create({
    //       _id: new mongoose.Types.ObjectId(),
    //       message: message,
    //       sender: data.user._id,
    //       conversation: conversation._id,
    //       isRead: false,
    //       isSent: true,
    //     });

    //     await newMessage.save();

    //     const updatedConversation = await Conversation.findOneAndUpdate(
    //       {
    //         _id: conversation._id,
    //       },
    //       { $push: { messages: newMessage._id } }
    //     );

    //     await updatedConversation.save();

    //     socket.broadcast.to(data.consId).emit("receive-message", newMessage);
    //   } catch (error) {
    //     return socket.emit("alert", {
    //       status: 500,
    //       message: "Infernal server error",
    //     });
    //   }
    // }
  };

  const removeMessage = async (data) => {
    const { consId, messageId } = data;

    try {
      const conversation = await Conversation.findOne({ _id: consId });
      if (conversation) {
        await Message.deleteOne({ _id: messageId });

        await Conversation.updateOne(
          { _id: conversation._id },
          { $pull: { messages: { $in: [messageId] } } }
        );
      }
    } catch (error) {
      return socket.emit("alert", {
        status: 500,
        message: "Infernal server error",
      });
    }
  };

  const fetchConversation = async (data) => {
    const _id = data.id;

    try {
      const conversation = await Conversation.findOne({
        _id,
      })
        .populate({
          path: "messages",
          populate: {
            path: "sender",
            select: "-password -friends -__v -messages",
          },
        })
        .populate(
          "participant group",
          "-password -friends -__v -groups -blocked -messages"
        );

      return socket.emit("conversation", {
        ...conversation._doc,
      });
    } catch (error) {
      return socket.emit("alert", {
        status: 500,
        message: "Infernal server error",
      });
    }
  };

  socket.on("send-message", sendMessage);
  socket.on("remove-message", removeMessage);
  socket.on("fetchConversation", fetchConversation);
};
