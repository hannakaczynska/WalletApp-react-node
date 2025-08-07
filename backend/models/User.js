const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user  = new mongoose.Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  refreshToken: { type: String, default: null },
  balance: { type: Number, default: 0 },
}, { versionKey: false });

user.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

user.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", user);
