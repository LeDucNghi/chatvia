const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const api = require("./api");
const multer = require("multer");
const upload = multer();
const { Server } = require("socket.io");

const registerFriendRequest = require("./socket/friendHandler");
const registerRoom = require("./socket/roomHandler");
const registerMessage = require("./socket/messageHandler");
const registerNotifications = require("./socket/notificationHandler");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
});

app.use(helmet());
app.use(upload.array());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

global.onlineUsers = new Map();

io.on("connection", async (socket) => {
  registerFriendRequest(io, socket);
  registerRoom(io, socket);
  registerMessage(io, socket);
  registerNotifications(io, socket);
});

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

  process.exit();
});

module.exports = { app };
