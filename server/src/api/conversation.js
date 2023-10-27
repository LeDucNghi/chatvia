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

router.post("/updateGroup", async (req, res) => {
  console.log("🚀 ~ file: conversation.js:42 ~ router.post ~ req:", req.body);

  return res.status(200).send({
    data: "not gud",
  });
});

module.exports = router;
