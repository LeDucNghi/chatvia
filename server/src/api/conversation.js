const express = require("express");
const { verifyToken } = require("../middleware/authorize");
const { getConversation, sendMessage } = require("../controller/conversation");

const router = express.Router();

router.post("/sendMessage", verifyToken, sendMessage);

router.get("/getConversation/:id", getConversation);

module.exports = router;
