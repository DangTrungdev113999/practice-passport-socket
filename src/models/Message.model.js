import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  senderId: String,
  receiverId: String,
  conversationType: String,
  messageType: String,
  sender: {
    id: String,
    name: String,
    avatar: String
  },
  receiver: {
    id: String,
    name: String,
    avatar: String
  },
  text: String,
  file: { data: Buffer, contentType: String, fileName: String},
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { tyupe: Number, default: null },
  deletedAt: { type: Number, default: null }
})

let Message = mongoose.model("message", MessageSchema);

module.exports = Message;