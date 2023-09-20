const { Message } = require("../models/Message");
const { Schema, default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  const { message, consId, partnerId } = await req.body;
  const token = req.decoded;

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
      user: token.user,
      conversationId: conversation._id,
    });

    await newMessage.save();

    return res.status(200).send({ message: { newMessage } });
  }
};

// GET CONVERSATION LIST
exports.getConversation = async (req, res) => {
  const _id = await req.params.id;

  const conversation = await Conversation.findById(_id);

  if (conversation) {
    const message = await Message.findOne({
      conversation: _id,
    })
      .populate("sender", "-password -__v")
      .exec();

    return res.status(200).send({ message });
  } else {
    return res.status(404).send({
      message:
        "This conversation is empty. Enter something to your partner to show how you think",
    });
  }
};
