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
  conversations,
  editContact,
  createGroupConversation,
} = require("../controller/conversation");
const { Group } = require("../models/Group");
const { default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");

const router = express.Router();

router.get("/getFriendRequest", verifyToken, getFriendRequest);

router.get("/settings", verifyToken, getSettings);

router.get("/friendList/:id", verifyToken, getFriendList);

router.post("/sendMessage", verifyToken, sendMessage);

router.post("/getConversation", getConversation);

router.post("/sendInvitation/:id", verifyToken, sendInvitation);

router.post("/friendRequestStt/:id", verifyToken, friendRequestStt);

router.post("/settings", verifyToken, updateSettings);

router.post("/conversations", verifyToken, conversations);

router.post("/editContact", verifyToken, editContact);

router.post("/groupConversation", verifyToken, createGroupConversation);

// router.post("/updateGroup/:id", async (req, res) => {
//   console.log("🚀 ~ file: conversation.js:42 ~ router.post ~ req:", req.body);

//   const {type} = await req.body
//   const groupId = await req.params.id

// if(type === "addUser") {

// }

//   return res.status(200).send({
//     data: "not gud",
//   });
// });

router.post("/addUser/:id", async (req, res) => {
  const _id = await req.params.id;
  const { participant } = await req.body;

  try {
    const group = await Group.findOne({ conversation: _id });

    if (group) {
      const existedMember = await Group.findOne({
        members: { _id: participant },
      });
      if (existedMember) {
        return res
          .status(200)
          .send({ message: "This user is already existed in this group!!" });
      } else {
        await Group.findOneAndUpdate(
          { conversation: _id },
          { $push: { members: { _id: participant } } }
        );

        await Conversation.findOneAndUpdate(
          { _id },
          { $push: { participant: participant } }
        );

        return res.status(200).send({ message: "Add user successfully 🥳" });
      }
    } else {
      return res.status(401).send({ message: "This is no group !!" });
    }
  } catch (error) {
    return res.status(500).send(`Infernal server error ${error}`);
  }
});

router.post("/", async(req, res) => {
  
});

module.exports = router;
