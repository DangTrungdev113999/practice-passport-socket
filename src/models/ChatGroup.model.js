import mongoose from "mongoose";

let Schema = mongoose.Schema();

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 1999 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  menbers: [{userId: String}],
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: null },
  deletedAt: { type: String, default: null }
})

let ChatGroup = mongoose.model("chatGroup", ChatGroupSchema);

module.exports = ChatGroup;