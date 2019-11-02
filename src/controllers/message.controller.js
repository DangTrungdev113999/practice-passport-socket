import { message } from "./../services/index";

let chatText = async (req, res) => {
  try {
    let receiverId = req.body.targetId;
    let messageVal = req.body.messageVal;
    let sender = {
      id: req.user._id,
      name: req.user.username
    }
    let newMessage = await message.chatText(
      sender,
      receiverId,
      messageVal
    );
    res.status(200).send(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  chatText
};