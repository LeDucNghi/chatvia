const express = require("express");

const router = express.Router();

// router.get('/', (req, res) => {
//   res.json(['😀', '😳', '🙄']);
// });

router.get("/", async (req, res) => {
  const { username, password } = req.body;

  const respsonse = await UserModel.findOne({ username }).select("-password");

  return res.json({ ...respsonse });
});

module.exports = router;
