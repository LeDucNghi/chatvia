const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const api = require("./api");
const multer = require("multer");
const upload = multer();

require("dotenv").config();

const app = express();
const server = http.createServer(app);
// const io = socket(server, {
//   cors: "*",
// });

app.use(helmet());
app.use(upload.array());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;

//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("chat-via", (data) => {
//     socket.join(data);
//   });

//   socket.on("send-msg", (data) => {
//     console.log("🚀 ~ file: app.js:46 ~ socket.on ~ data:", data);
//     // const sendUserSocket = onlineUsers.get(data.to);

//     // if (sendUserSocket) {
//     //   socket.to(sendUserSocket).emit("msg-receive", data.msg);
//     // }
//     socket.to(data.room).emit("msg-receive", data.msg);
//   });
//   console.log("A user connected", socket.id);

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

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

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  // Optionally, perform any cleanup tasks before restarting

  // Restart the Node.js process
  process.exit();
});

module.exports = { app };
