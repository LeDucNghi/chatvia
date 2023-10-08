const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenConfig = require("../config/token");
const transporter = require("../config/mail");

// SIGN UP
exports.signup = async (req, res) => {
  try {
    const { username, password, email } = await req.body;

    if (!username || !password || !email) {
      return res.status(401).send({ message: "Some field are missing !!" });
    } else {
      // const user = await User.findOne({ username }).select("-password");
      const existedUser = await User.findOne({ username });

      const existedEmail = await User.findOne({ email });

      if (existedUser) {
        res.status(401).send({ message: "User already exist!!" });
      } else if (existedEmail) {
        res.status(401).send({ message: "Email already exist!!" });
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
  } catch (error) {
    return res
      .status(500)
      .send({ error: `${error}`, message: `Internal Server Error` });
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
exports.sendEmail = async (req, res) => {
  const { email } = await req.body;

  const user = await User.findOne({ email });

  if (user) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Chatvia Team 👻" chatvia.team@gmail.com', // sender address
      to: `${email}@gmail.com`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>Hi ${user.username}, </h1> <br /> <h3>Click the button below to redirect to reset your password</h3> <br /> <button><a href="https://chatviaa.vercel.app/reset/${email}" > Click here</a> </button>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // info.catch(console.error);

    res.status(200).send({
      messageId: info.messageId,
      message: "We have sent to your email !!",
    });
  } else {
    res.status(404).send({ message: "User not found!!" });
  }
};

// GET USER
exports.getUser = async (req, res) => {
  try {
    const { user } = await req.decoded;

    const { password, ...rest } = user;

    return res.status(200).send({ ...rest });
  } catch (error) {
    res.status(500).send({ error });
  }
};

exports.validateUser = async (req, res) => {
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
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");

    return res.status(200).send({ data: users });
  } catch (error) {
    return res.status(401).send({ error });
  }
};
