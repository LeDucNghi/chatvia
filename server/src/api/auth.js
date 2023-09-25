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

module.exports = router;
