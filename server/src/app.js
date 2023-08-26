const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middleware/errorHandler");
const api = require("./api");

const app = express();
const io = require("./config/socket");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

io.on("connection", (socket) => {
  console.log(`user connected:`, socket.id, socket.handshake.query.userId);

  const userId = socket.handshake.query.userId;

  socket.userId = userId;

  console.log(`UserId ${userId}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(`message data:`, data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected`, socket.id);
  });
});

mongoose.connect(
  "mongodb+srv://ducnghi:0972647481Nghi@cluster0.zuv1ih0.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

module.exports = app;
