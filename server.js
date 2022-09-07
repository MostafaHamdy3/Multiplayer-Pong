const apiServer = require("./api");
const http = require("http");
const io = require("socket.io");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./sockets");

// const PORT = 3005;
const PORT = process.env.PORT || 3000;

// server.listen(PORT)
// console.log(`Listening on ${PORT}`);
httpServer.listen(PORT, () => console.log(`Listening on ${PORT}`));

sockets.listen(socketServer);
