const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const api = require("./api");
const http = require("http");
const socket = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: "http://localhost:3000/",
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
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

module.exports = app;
