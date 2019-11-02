import chatText from "./chatText/chatText";


let initSocket = io => {
  chatText(io);
}

module.exports = initSocket;