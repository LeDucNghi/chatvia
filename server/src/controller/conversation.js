const { Message } = require("../models/Message");
const { default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");
const pusher = require("../config/pusher");
const { Friend } = require("../models/Friend");
const { User } = require("../models/Users");
const { Settings } = require("../models/Settings");
const { Blocked } = require("../models/Block");
const { Group } = require("../models/Group");

// SEND MESSAGE
exports.sendMessage = async (req, res) => {
  const { message, consId, partnerId } = await req.body;
  const token = await req.decoded;

  try {
    await pusher.trigger("message", "my-event", {
      message: message,
      sender: { ...token.user },
    });

    const conversation = await Conversation.findById(consId);
    const newMsgId = new mongoose.Types.ObjectId();
    const newConsId = new mongoose.Types.ObjectId();

    if (!conversation) {
      const newConversation = await Conversation.create({
        _id: newConsId,
        isGroup: false,
        groupName: "",
        participant: [token.user._id, partnerId],
        messages: [newMsgId],
      });

      await newConversation.save();

      const newMessage = await new Message({
        _id: newMsgId,
        message: message,
        sender: token.user,
        conversation: newConsId,
      });

      await newMessage.save();

      return res.status(200).send({ message: newMessage });
    } else {
      const newMessage = await Message.create({
        _id: newMsgId,
        message: message,
        sender: token.user,
        conversation: newConsId,
      });

      await newMessage.save();

      await Conversation.findOneAndUpdate(
        {
          _id: conversation._id,
        },
        { $push: { messages: message } }
      );

      return res.status(200).send({ message: newMessage });
    }
  } catch (error) {
    return res.status(500).send(`Infernal server error ${error}`);
  }
};

// GET CONVERSATION LIST
exports.getConversation = async (req, res) => {
  const isGroup = await req.query.isGroup;
  const { participant } = await req.body;

  try {
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
  } catch (error) {
    console.log(
      "🚀 ~ file: conversation.js:83 ~ exports.getConversation= ~ error:",
      error
    );
    return res.status(500).send(`Infernal server error ${error}`);
  }
};

// GET FRIEND REQUEST
exports.getFriendRequest = async (req, res) => {
  try {
    const token = await req.decoded;

    const request = await Friend.find({
      friend: token.user._id,
      friendShipStatus: "pending",
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
    return res.status(500).send(`Infernal server error ${error}`);
  }
};

// SEND FRIEND INVITATION
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

// UPDATE FRIEND REQUEST STATUS
exports.friendRequestStt = async (req, res) => {
  const id = await req.params.id;
  const token = await req.decoded;
  const { status } = await req.body;

  const request = await Friend.findOne({
    _id: id,
    friendShipStatus: "pending",
  });

  if (request) {
    if (request.friend._id.equals(token.user._id)) {
      await User.findOneAndUpdate(
        { username: token.user.username },
        { $push: { friends: [request.sender._id] } },
        {
          new: true,
        }
      );

      await User.findOneAndUpdate(
        { _id: request.sender._id },
        { $push: { friends: [token.user._id] } },
        {
          new: true,
        }
      );
    } else if (request.sender._id.equals(token.user._id)) {
      await User.findOneAndUpdate(
        { username: token.user.username },
        { $push: { friends: [request.friend._id] } },
        {
          new: true,
        }
      );

      await User.findOneAndUpdate(
        { _id: request.friend._id },
        { $push: { friends: [token.user._id] } },
        {
          new: true,
        }
      );
    }
    const newStatus = status[0].toUpperCase() + status.slice(1);

    await Friend.findOneAndUpdate({ _id: id }, { friendShipStatus: status });

    return res.status(200).send({ message: newStatus });
  } else {
    await res.status(404).send({ message: "Request not found" });
  }
};

// UPDATE SETTINGS
exports.updateSettings = async (req, res) => {
  const { language, mode } = await req.body;
  const token = await req.decoded;

  try {
    const settings = await Settings.findOne({ user: token.user._id });

    if (!settings) {
      await Settings.create({
        languages: language,
        mode: mode,
        user: token.user._id,
      });

      return res.status(200).send({ message: "Create successfully !!" });
    } else {
      await Settings.findOneAndUpdate(
        { user: token.user._id },
        { languages: language, mode: mode }
      );

      return res.status(200).send({ message: "Update successfully !!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
  }
};

// GET SETTINGS
exports.getSettings = async (req, res) => {
  const token = await req.decoded;

  try {
    const settings = await Settings.findOne({ user: token.user._id });

    return res.status(200).send({ data: settings });
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
  }
};

// GET FRIEND LIST
exports.getFriendList = async (req, res) => {
  try {
    const id = await req.params.id;
    const { user } = await req.decoded;

    const friendList = await Friend.find({
      $or: [
        { friend: user._id, sender: id },
        { friend: id, sender: user._id },
        { friendShipStatus: "accepted" },
      ],
    })
      .populate("sender friend", "-password -__v")
      .exec();

    if (friendList) {
      return res.status(200).send({ data: friendList });
    }
    return res.status(404).send({ message: "You do not have any friends😢" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
  }
};

// GET USER ALL CONVERSATION
exports.conversations = async (req, res) => {
  const token = await req.decoded;

  try {
    const conversations = await Conversation.find({
      participant: { $in: token.user._id },
    })
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "-password -friends -__v -messages",
        },
      })
      .populate("participant", "-password -__v -friends")
      .exec();

    return res.status(200).send({ data: conversations });
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
  }
};

// EDIT CONTACT
exports.editContact = async (req, res) => {
  const token = await req.decoded;
  const { contactId, type } = await req.body;

  const friends = await User.findOne({
    friends: { $in: contactId },
  });

  if (!friends) {
    return res
      .status(200)
      .send({ message: "You do not have this friend in your list 🤔" });
  } else {
    if (type === "block") {
      const user = await User.findOne({ blocked: { $in: contactId } });
      const blocked = await Blocked.findOne({ blocked: contactId });

      if (!user && !blocked) {
        await User.findOneAndUpdate(
          { _id: token.user._id },
          { $push: { blocked: contactId } },
          {
            new: true,
          }
        );

        const newUserBlocked = await Blocked.create({
          _id: new mongoose.Types.ObjectId(),
          user: token.user._id,
          blocked: contactId,
        });

        await newUserBlocked.save();

        return res.status(200).send({ message: "Blocked" });
      } else {
        await Blocked.deleteOne({
          user: blocked.user,
        });

        await User.updateOne(
          { _id: token.user._id },
          {
            $pull: { blocked: { $in: [contactId] } },
          }
        );

        return res.status(200).send({ message: "Unblocked" });
      }
    } else if (type === "remove") {
      const response = await User.updateOne(
        { _id: token.user._id },
        {
          $pull: { friends: { $in: [contactId] } },
        }
      );

      return res.status(200).send({ response });
    }
  }
};

// CREATE GROUP CONVERSATION
exports.createGroupConversation = async (req, res) => {
  const { participant, groupName } = await req.body;
  const token = await req.decoded;

  const index = participant.filter((item) => item === token.user._id);

  try {
    if (index.length !== 0) {
      return res.status(404).send({ message: "Duplicate Id" });
    } else {
      const newParticipant = [...participant, token.user._id];

      const newGroupConversation = await Conversation.create({
        _id: new mongoose.Types.ObjectId(),
        isGroup: true,
        groupName: groupName ? groupName : `${token.user.username}'s group`,
        participant: newParticipant,
      });

      const newGroup = await Group.create({
        name: groupName,

        members: [],
      });

      for (const memId of newParticipant) {
        const member = await Group.findOne({ _id: newGroup._id });

        if (member) {
          newGroup.members.push({
            member: memId,
            role: memId === token.user._id ? "admin" : "member",
          });
        }
      }

      await newGroup.save();

      await newGroupConversation.save();

      await User.updateOne(
        { _id: token.user._id },
        { $push: { groups: newGroup._id } }
      );

      return res.status(200).send({ message: "Create successfully!!" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
  }
};
