const express = require("express");
const { User } = require("../models/Users");
const {
  signup,
  signin,
  updateProfile,
  sendEmail,
  getUser,
  validateUser,
  getAllUsers,
  findContacts,
} = require("../controller/auth");
const { verifyToken } = require("../middleware/authorize");
const { Friend } = require("../models/Friend");
const pusher = require("../config/pusher");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/generateToken", async (req, res) => {});

router.post("/sendEmail", sendEmail);

router.post("/updateProfile", updateProfile);

router.get("/getUser", verifyToken, getUser);

router.post("/validateUser/:email", validateUser);

router.get("/users", getAllUsers);

module.exports = router;
