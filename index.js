const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { allowEIO3: true });

var numbers = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("get-value", () => {
    socket.emit("value", numbers);
  });

  socket.on("new-notification", () => {
    ++numbers;
    console.log(numbers);
    socket.broadcast.emit("value", numbers);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
