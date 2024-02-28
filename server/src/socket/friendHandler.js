const { Friend } = require("../models/Friend");
const { User } = require("../models/Users");
const { default: mongoose } = require("mongoose");

module.exports = (io, socket) => {
  const sendInvitation = async (data) => {
    try {
      const request = await Friend.findOne({
        _id: new mongoose.Types.ObjectId(),
        friend: data.id,
        sender: data.user._id,
      });

      if (request) {
        await Friend.deleteOne({ _id: request._id });

        socket.emit("alert", {
          status: 400,
          message: "You have just cancelled your request!!",
        });
      } else {
        if (data.id === data.user._id) {
          // socket.broadcast.to(data.room).emit("receive-request", {
          //   error: "sai",
          // });

          socket.emit("alert", {
            status: 404,
            message: "You cannot send request to yourself🤔",
          });
        } else {
          const user = await User.findOne({ _id: data.id }).select(
            "-password -__v"
          );

          if (user) {
            const newFriendShip = await Friend.create({
              _id: new mongoose.Types.ObjectId(),
              friend: user._id,
              friendShipStatus: "pending",
              sender: data.user._id,
            });

            await newFriendShip.save();

            socket.broadcast.to(data.room).emit("receive-request", {
              _id: newFriendShip._id,
              friend: user._id,
              sender: data.user,
              friendShipStatus: "pending",
            });
          }
        }
      }
    } catch (error) {
      console.log("🚀 ~ sendInvitation ~ error:", error);
    }
  };

  socket.on("friendRequest", sendInvitation);
};
