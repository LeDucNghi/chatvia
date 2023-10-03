const express = require("express");
const { verifyToken } = require("../middleware/authorize");
const { getConversation, sendMessage } = require("../controller/conversation");
const { Friend } = require("../models/Friend");

const router = express.Router();

router.post("/sendMessage", verifyToken, sendMessage);

router.post("/getConversation", getConversation);

router.get("/getFriendRequest", verifyToken, async (req, res) => {
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
});

router.post("/sendInvitation/:id", verifyToken, async (req, res) => {
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
});

router.post("/friendRequestStt/:id", async (req, res) => {
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
});

module.exports = router;
