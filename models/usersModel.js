const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    age: Number,
    address: String,
    phone: Number,
  },
  {
    timeseries: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
