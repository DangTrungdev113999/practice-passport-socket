import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: { type: String, default: "male" },
  phone: {type: String, default: null},
  address: { type: String, default: null },
  avatar: { type: String, default: "avatar-default.jpg" },
  role: { type: String, default: "user" },
  local: {
    email: { type: String, trim: true },
    password: String,
    isActive: { type: Boolean, default: false },
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: { type: String, trim: true }
  },
  google: {
    uid: String,
    token: String, 
    email: { type: String, trim: true}
  }, 
  createAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
})

UserSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findUserByEmail(email) {
    return this.findOne({"local.email": email}).exec();
  },
  findByIdForSessionToUse(id) {
    return this.findById(id).exec();
  },
  findUserByFacebookId(id) {
    return this.findOne({ "facebook.uid": id }).exec();
  },
}

UserSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password, this.local.password)
  }
}

// UserSchema.methods = {
//   comparePassword(password) {
//     // return a promise, has result true or false
//     return bcrypt.compare(password, this.local.password);
//   }
// };


let User = mongoose.model("user", UserSchema);

module.exports = User;