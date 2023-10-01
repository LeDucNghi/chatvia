const { Message } = require("../models/Message");
const { Schema, default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");
const pusher = require("../config/pusher");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  const { message, consId, partnerId } = await req.body;
  const token = await req.decoded;

  await pusher.trigger("message", "my-event", {
    message: message,
    sender: { ...token.user },
  });

  const conversation = await Conversation.findById(consId);

  if (!conversation) {
    const newConversation = await Conversation.create({
      _id: new mongoose.Types.ObjectId(),
      isGroup: false,
      groupName: "",
      participant: [token.user._id, partnerId],
    });

    await newConversation.save();

    const newMessage = await new Message({
      message: message,
      sender: token.user,
      conversation: newConversation._id,
    });

    await newMessage.save();

    return res.status(200).send({ message: newMessage });
  } else {
    const newMessage = await Message.create({
      message: message,
      sender: token.user,
      conversation: conversation._id,
    });

    await newMessage.save();

    return res.status(200).send({ message: newMessage });
  }
};

// GET CONVERSATION LIST
exports.getConversation = async (req, res) => {
  const isGroup = await req.query.isGroup;
  const { participant } = await req.body;

  const conversation = await Conversation.findOne({
    isGroup,
    participant: { $in: participant },
  });

  if (conversation) {
    const message = await Message.find({
      conversation: conversation._id,
    })
      .populate("sender", "-password -__v -messages")
      .exec();

    conversation.messages = [...message];

    return res.status(200).send({
      data: conversation,
    });
  } else {
    return res.status(404).send({
      message:
        "This conversation is empty. Enter something to your partner to show how you think",
    });
  }
};
