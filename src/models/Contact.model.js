import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

ContactSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  getAllFriend(userId) {
    return this.find({
      $and: [
        {
          $or: [
            { contactId: userId },
            { userId: userId }
          ],
        },
        { status: true }
      ]
    }).exec()
  }
}

let Contact = mongoose.model("contact", ContactSchema);

module.exports = Contact;