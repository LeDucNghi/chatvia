const express = require("express");

const user = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", user);

module.exports = router;
