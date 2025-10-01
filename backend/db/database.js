const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/grounds2dish");
    console.log("Connect success");
  } catch (error) {
    console.log("Connect error");
  }
};
