const express = require("express");
const { verifyToken } = require("../middleware/authorize");
const {
  getConversation,
  sendMessage,
  getFriendRequest,
  sendInvitation,
  friendRequestStt,
} = require("../controller/conversation");
const { Friend } = require("../models/Friend");

const router = express.Router();

router.get("/getFriendRequest", verifyToken, getFriendRequest);

router.post("/sendMessage", verifyToken, sendMessage);

router.post("/getConversation", getConversation);

router.post("/sendInvitation/:id", verifyToken, sendInvitation);

router.post("/friendRequestStt/:id", friendRequestStt);

router.get("/friendList/:id", verifyToken, async (req, res) => {
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
});

module.exports = router;
