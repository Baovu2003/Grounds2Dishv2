const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/grounds2dish");
    console.log("Connect success");
  } catch (error) {
    console.log("Connect error");
  }
};
