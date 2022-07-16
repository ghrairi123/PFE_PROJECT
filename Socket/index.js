// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.LastName === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };
// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {
//   console.log("a user connected.");

//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);
//   });
//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     io.to(receiverName).emit("getNotification", {
//       senderName,
//       type,
//     });
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     io.to(receiverName).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//   });
// });

// io.listen(8900);
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.sendFile("D:\\Projet_Pfe\\Socket\\index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("notification", (data) => {
    console.log(data);
    io.emit("getNotification", data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});
io.listen(8900, () => {
  console.log("listening on *:8900");
});
