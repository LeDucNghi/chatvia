const express = require("express");
const { UserModel } = require("../models/Users");
const {
  signup,
  signin,
  updateProfile,
  resetPassword,
  getUser,
} = require("../controller/auth");
const { verifyToken } = require("../middleware/authorize");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/generateToken", async (req, res) => {});

router.post("/resetPassword", resetPassword);

router.post("/updateProfile", updateProfile);

router.get("/getUser", verifyToken, getUser);

module.exports = router;
