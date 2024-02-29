const { default: mongoose } = require("mongoose");
const { Notification } = require("../models/Notifications");

module.exports = (io, socket) => {
  const notifies = async (data) => {
    try {
      io.to(data.room).emit("receive-notify", {
        id: new mongoose.Types.ObjectId(),
        user: data.user,
        readStatus: false,
        content: data.content,
        type: data.type,
        timeStamp: new Date(),
      });

      await Notification.create({
        _id: new mongoose.Types.ObjectId(),
        user: data.user,
        content: data.content,
        type: data.type,
      });

      return socket.emit("alert", {
        status: 200,
        message: `${data.content}`,
      });
    } catch (error) {
      return socket.emit("alert", {
        status: 500,
        message: "Something went wrong!!",
      });
    }
  };

  socket.on("notifications", notifies);
};
