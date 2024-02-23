module.exports = (io, socket) => {
  socket.on("send-message", (data) => {
    socket.broadcast.to(data.room).emit("receive-message", data);
  });
};
