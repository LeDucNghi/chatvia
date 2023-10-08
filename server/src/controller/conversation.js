const { Message } = require("../models/Message");
const { Schema, default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");
const pusher = require("../config/pusher");
const { Friend } = require("../models/Friend");

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

exports.getFriendRequest = async (req, res) => {
  try {
    const token = await req.decoded;

    const request = await Friend.find({
      friend: token.user._id,
    })
      .populate("sender", "-password -__v -messages")
      .exec();

    if (request) {
      return res.status(200).send({ data: request });
    } else {
      return res.status(404).send({
        message: "You have not sent invitation to this user before!!",
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: conversation.js:16 ~ router.post ~ error:", error);
    return res.status(500).send(`Infernal server error ${error}`);
  }
};

exports.sendInvitation = async (req, res) => {
  const _id = await req.params.id;

  const token = await req.decoded;

  const request = await Friend.findOne({ friend: _id, sender: token._id });

  if (request) {
    await Friend.deleteOne({ _id: request._id });

    return res.status(200).send({
      message: "You just cancelled your friend request to this user!!",
    });
  } else {
    if (_id === token.user._id) {
      return res
        .status(401)
        .send({ message: "You can not send invitation to yourself🤡" });
    } else {
      pusher.trigger("friend-request", `${_id}`, {
        sender: { ...token.user },
      });

      const user = await User.findOne({ _id }).select("-password -__v");

      if (user) {
        const newFriendShip = await Friend.create({
          friend: user._id,
          friendShipStatus: "pending",
          sender: token.user._id,
        });

        await newFriendShip.save();

        return res.status(200).send({ message: "Invitation has been sent!!" });
      }
    }
  }
};

exports.friendRequestStt = async (req, res) => {
  const id = await req.params.id;
  const { status } = await req.body;

  const request = await Friend.findOne({ _id: id });

  const newStatus = status[0].toUpperCase() + status.slice(1);

  if (request) {
    await Friend.findOneAndUpdate({ _id: id }, { friendShipStatus: status });

    return res.status(200).send({ message: newStatus });
  } else {
    await res.status(404).send({ message: "Request not found" });
  }
};
