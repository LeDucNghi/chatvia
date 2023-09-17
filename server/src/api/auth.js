const express = require("express");
const { UserModel } = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(401).send({ message: "Some field are missing !!" });
  } else {
    // const user = await UserModel.findOne({ username }).select("-password");
    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(401).send({ message: "User already exist!!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();

      return res
        .status(200)
        .send({ message: "User registered successfully!!" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send({ "message ": "Some fields are missing!!" });
  } else {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).send({ message: "User not found!!" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ message: "Username or Password is not valid!!" });
      } else {
        const token = jwt.sign({ user }, tokenConfig.SECRET);

        return res.status(200).send({ message: "Login successfully!!", token });
      }
    }
  }
});

router.post("/generateToken", async (req, res) => {});

router.post("/getUser", async (req, res) => {
  const token = req.headers.authorization;

  return res.status(200).send({ token });
});

module.exports = router;
