const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  phone: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    default: "active",
  },
  profileImage: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
