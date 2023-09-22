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
      sender: token.user,
      conversation: conversation._id,
    });

    await newMessage.save();

    return res.status(200).send({ message: newMessage });
  }
};

// GET CONVERSATION LIST
exports.getConversation = async (req, res) => {
  const _id = await req.params.id;
  const isGroup = await req.query.isGroup;
  console.log(
    "🚀 ~ file: conversation.js:48 ~ exports.getConversation= ~ isGroup:",
    isGroup,
    _id
  );

  const conversation = await Conversation.findOne({
    _id,
    isGroup,
  });

  // return res.status(200).send({ conversation });
  if (conversation) {
    const message = await Message.find({
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
