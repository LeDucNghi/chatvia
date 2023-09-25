const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const socket = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: process.env.CLIENT,
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const api = require("./api");
const pusher = require("./config/pusher");

app.use("/api", api);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("chat-via", (data) => {
    socket.join(data);
  });

  socket.on("send-msg", (data) => {
    console.log("🚀 ~ file: app.js:46 ~ socket.on ~ data:", data);
    // const sendUserSocket = onlineUsers.get(data.to);

    // if (sendUserSocket) {
    //   socket.to(sendUserSocket).emit("msg-receive", data.msg);
    // }
    socket.to(data.room).emit("msg-receive", data.msg);
  });
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// pusher
//   .trigger("my-channel", "my-event", {
//     message: "hello world",
//   })
//   .then((e) => console.log(e));

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zuv1ih0.mongodb.net/Cluster0?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

module.exports = { app };
