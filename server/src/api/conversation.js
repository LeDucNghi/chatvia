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

module.exports = router;
