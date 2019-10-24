import mongoose from "mongoose";
import bluebird from "bluebird";

let connectDB = () => {
  mongoose.Promise = bluebird;

  let URI = `${process.env.DB_CONNECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}}`

  return mongoose.connect(URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log("db connected"))
}

module.exports = connectDB;