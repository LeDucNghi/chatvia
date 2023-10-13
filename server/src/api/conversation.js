const express = require("express");
const { verifyToken } = require("../middleware/authorize");
const {
  getConversation,
  sendMessage,
  getFriendRequest,
  sendInvitation,
  friendRequestStt,
  updateSettings,
  getSettings,
  getFriendList,
} = require("../controller/conversation");
const { Conversation } = require("../models/Conversation");
const { Message } = require("../models/Message");

const router = express.Router();

router.get("/getFriendRequest", verifyToken, getFriendRequest);

router.get("/settings", verifyToken, getSettings);

router.get("/friendList/:id", verifyToken, getFriendList);

router.post("/sendMessage", verifyToken, sendMessage);

router.post("/getConversation", getConversation);

router.post("/sendInvitation/:id", verifyToken, sendInvitation);

router.post("/friendRequestStt/:id", verifyToken, friendRequestStt);

router.post("/settings", verifyToken, updateSettings);

router.post("/conversations", verifyToken, async (req, res) => {
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
});

module.exports = router;
