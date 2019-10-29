import bcrypt from "bcrypt";
import uuidV4 from "uuidv4";

import UserModel from "./../models/User.model";
import { transErrors, transSuccess } from "./../../lang/vi";

const saltRounds = 6;

let register = (username, email, password) => {
  return new Promise( async(resolve, reject) => {
    try {
      let user = await UserModel.findUserByEmail(email);
      if (user) {
        if (user.deletedAt !== null) {
          return reject(transErrors.account_deleted);
        };
        if (!user.local.isActive) {
          return reject(transErrors.account_not_active);
        }
        return reject(transErrors.account_already_exist)
      }
  
      let salt = bcrypt.genSaltSync(saltRounds);
  
      let userItem = {
        username,
        local: {
          email,
          password: bcrypt.hashSync(password, salt),
          isActive: true,
          verifyToken: uuidV4()
        }
      }
  
      let newUser = await UserModel.createNew(userItem);
      if (!!newUser) {
        resolve(transSuccess.register_success);
      }
    } catch (error) {
      reject(error);
    }

  })
}


module.exports = {
  register,
}