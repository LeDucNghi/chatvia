const { UserModel } = require("../models/Users");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");

const router = express.Router();

// SIGN UP
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(401).send({ "message: ": "Some field are missing!!" });
  } else {
    const user = await UserModel.findOne({ username }).select("-password");

    if (!user) {
      res.status(400).send({ message: "User is already existed" });
    } else {
      // const accessToken = jwt.sign(user, tokenConfig.SECRET, {
      //   expiresIn: tokenConfig.tokenLife,
      // });
      // const refreshToken = jwt.sign(user, tokenConfig.SECRET_REFRESH, {
      //   expiresIn: tokenConfig.refreshTokenLife,
      // });

      // const response = {
      //   ...user,
      //   accessToken,
      //   refreshToken,
      // };

      return res.status(200).send({ data: { ...response } });
    }
  }
});

// router.post("/signin");

module.exports = router;
