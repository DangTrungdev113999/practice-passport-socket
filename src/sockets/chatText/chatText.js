import { pushSocketIdToArray, removeSocketIdFromArray } from "./../../helper/socketHelper";

let chatText = io => {
  let clients = {};
  io.on("connection", socket => {
    let currentId = socket.request.user._id;
    clients = pushSocketIdToArray(clients, currentId, socket.id);

    socket.on("chat-text", data => {
      clients[data.receiverId].forEach(socketId => {
        io.sockets.connected[socketId].emit("response-chat-text", data)
      })
    });

    socket.on("disconnect",() => {
      clients = removeSocketIdFromArray(clients, currentId, socket.id);
    });
  });
}

module.exports = chatText