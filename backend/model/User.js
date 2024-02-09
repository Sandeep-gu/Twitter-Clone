const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
    },
    location: {
      type: String,
    },
    DOB: {
      type: String,
    },
    followers: {
      type: Array,
      ref: "User",
    },
    following: {
      type: Array,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema); // Changed the model name to "User"
module.exports = UserModel;
