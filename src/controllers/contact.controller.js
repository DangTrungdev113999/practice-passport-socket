import { contact } from "./../services/index"

let addFriend = async (req, res) => {
    try {
      let targetId = req.body.uid;
      let userId = req.user._id;
      let newContact = await contact.addFriend(userId, targetId);
      res.status(200).send(newContact);
    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }
}

module.exports = {
  addFriend
}