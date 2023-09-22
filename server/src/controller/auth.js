const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");
const transporter = require("../config/mail");

// SIGN UP
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(401).send({ message: "Some field are missing !!" });
  } else {
    // const user = await User.findOne({ username }).select("-password");
    const user = await User.findOne({ username });

    if (user) {
      res.status(401).send({ message: "User already exist!!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
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
};

// SIGN IN
exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).send({ "message ": "Some fields are missing!!" });
  } else {
    const user = await User.findOne({ username });

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
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const { username, ...rest } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send({ message: "User Not Found!!" });
  } else {
    const doc = await User.findOneAndUpdate(
      { username },
      { ...rest },
      {
        new: true,
      }
    ).select("-password -__v");

    return res.status(200).send({ doc });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Chatvia Team 👻" chatvia.team@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>test from Chatvia BE.</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  main().catch(console.error);

  res.status(200).send(info.messageId);
};

// GET USER
exports.getUser = async (req, res) => {
  const { user } = req.decoded;

  const { password, ...rest } = user;

  return res.status(200).send({ user: rest });
};
