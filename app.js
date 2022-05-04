//노드 서버 만들기
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIo = require("socket.io");
const moment = require("moment");

const io = socketIo(server);
//console.log('hello');

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    console.log(data);
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:ss A"),
    });
  });
  //console.log("연결이 이루어 졌습니다");
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));
