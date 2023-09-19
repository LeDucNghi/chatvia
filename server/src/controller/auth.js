const { UserModel } = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");
const transporter = require("../config/mail");

exports.signup = async (req, res) => {
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
};

exports.signin = async (req, res) => {
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
};

exports.updateProfile = async (req, res) => {
  const { username, avatar } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(401).send({ message: "User Not Found!!" });
  } else {
    const doc = await UserModel.findOneAndUpdate(
      { username },
      { avatar },
      {
        new: true,
      }
    ).select("-password -__v");

    return res.status(200).send({ doc });
  }
};

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
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

exports.getUser = async (req, res) => {
  const token = req.decoded;

  return res.status(200).send({ token });
};
