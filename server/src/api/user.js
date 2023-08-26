const express = require("express");
const { UserModel } = require("../models/Users");

const router = express.Router();

router.get("/all", async (req, res) => {
  const { username, password } = req.body;

  const respsonse = await UserModel.findOne({ username }).select("-password");

  return res.json({ ...respsonse });
});

module.exports = router;
