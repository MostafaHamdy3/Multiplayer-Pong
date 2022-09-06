let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("ready", () => {
      let room = "room" + readyPlayerCount / 2;
      socket.join(room);
      console.log("Player ready", socket.id);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        pongNamespace.emit("Start game", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
  });
}

module.exports = { listen };
