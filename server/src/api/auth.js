const express = require("express");
const { User } = require("../models/Users");
const {
  signup,
  signin,
  updateProfile,
  sendEmail,
  getUser,
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

router.post("/validateUser/:email", async (req, res) => {
  const email = await req.params.email;

  if (!email) {
    res.status(404).send({ message: "Email is required!!" });
  } else {
    const user = User.findOne({ email: `${email}@gmail.com` });

    if (!user) {
      res.status(404).send({ message: "User not found!!" });
    } else {
      res.status(200).send({ message: "hihi" });
    }
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");

    return res.status(200).send({ data: users });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

router.post("/findContact", async (req, res) => {
  const { email } = await req.body;

  const emailRegex = new RegExp(`\\b[A-Za-z0-9._%+-]+@gmail.com\\b`);

  const validEmail = emailRegex.test(email);

  const user = await User.find({ email: email }).select("-password -__v");

  if (validEmail) {
    if (!user) {
      return res.status(404).send({ message: "This contact not found 🤔" });
    } else {
      return res.status(200).send({ data: user });
    }
  } else {
    return res.status(401).send({ message: "Invalid email!!" });
  }
});

module.exports = router;
