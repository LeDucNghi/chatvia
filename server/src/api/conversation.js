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
  leaveGroup,
  addUserToGroup,
} = require("../controller/conversation");
const { uploadImage, upload } = require("../utils/cloudinary");

const router = express.Router();

// GET FRIEND INVITATION
router.get("/getFriendRequest", verifyToken, getFriendRequest);

// GET SETTING
router.get("/settings", verifyToken, getSettings);

// GET FRIEND LIST
router.get("/friendList/:id", verifyToken, getFriendList);

// SEND MESSAGE
router.post("/sendMessage", verifyToken, sendMessage);

// GET SPECIFIC CONVERSATION
router.post("/getConversation/:groupName", getConversation);

// SEND FRIEND INVITATION
router.post("/sendInvitation/:id", verifyToken, sendInvitation);

// UPDATE FRIEND INVITATION STATUS
router.post("/friendRequestStt/:id", verifyToken, friendRequestStt);

// UPDATE SETTING
router.post("/settings", verifyToken, updateSettings);

// GET USER'S CONVERSATIONS
router.post("/conversations", verifyToken, conversations);

// EDIT USER'S CONTACT
router.post("/editContact", verifyToken, editContact);

// CREATE GROUP CONVERSATION
router.post("/groupConversation", verifyToken, createGroupConversation);

// ADD USER TO GROUP
router.post("/addUser/:id", addUserToGroup);

router.post("/leaveGroup/:id", verifyToken, leaveGroup);

router.post("/uploadImg", upload, async (req, res) => {
  const { imgPath } = await req.body;

  const img = await uploadImage(imgPath);

  return res.status(200).send({ img });
});

module.exports = router;
