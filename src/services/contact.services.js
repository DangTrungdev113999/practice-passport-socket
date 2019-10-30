import UserModel from "./../models/User.model";
import ContactModel from "./../models/Contact.model";
import _ from 'lodash';


let getAllUser =  userId => {
  return new Promise( async(resolve, reject) => {
    try {
      let friendIds = [userId];
      let friends = await ContactModel.getAllFriend(userId);
      friends.forEach((item) => {
        friendIds.push(item.userId);
        friendIds.push(item.contactId)
      });

      friendIds = _.unionBy(friendIds);
      let users = await UserModel.findUserToAdd(friendIds);
      resolve(users)
    } catch (error) {
      reject(error)
    }
  });
};

let addFriend = (userId, contactId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContactItem = {
        userId,
        contactId,
        status: true
      };

      let newContact = await ContactModel.createNew(newContactItem);
      resolve(!!newContact);
    } catch (error) {
      reject(error)
    }
  })
};

let getAllFriend = userId => {
  return new Promise( async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getAllFriend(userId);

      let users = contacts.map(async contact => {
        if (contact.userId == userId) {
          return await UserModel.findUserById(contact.contactId);
        };
        return await UserModel.findUserById(contact.userId);
      });

      resolve(await Promise.all(users))
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })

}

module.exports = {
  getAllUser,
  addFriend,
  getAllFriend
}