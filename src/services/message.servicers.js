import MessageModel from "./../models/Message.model";
import UserModel from "./../models/User.model";

let chatText = (sender, receiverId, messageVal) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getUserReceiver = await UserModel.findUserById(receiverId);
      if(!getUserReceiver) {
        return reject("Receiver not exsit !")
      };

      let receiver = {
        id: getUserReceiver._id,
        name: getUserReceiver.username,
      };

      let newMessageItem = {
        senderId: sender.id,
        receiverId: receiver.id,
        conversationType: "personal",
        messageType: "text",
        sender: sender,
        receiver: receiver,
        text: messageVal,
        createdAt: Date.now()
      };

      let newMessage = MessageModel.createNew(newMessageItem);

      resolve(newMessage)
    } catch (error) {
      return reject(error);
    }
  })
}

module.exports = {
  chatText
}