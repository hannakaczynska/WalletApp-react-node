const mongoose = require("mongoose");

const userSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  balance: { type: Number, default: 0 },
}

module.exports = mongoose.model("User", new mongoose.Schema({
  ...userSchema,
}));
