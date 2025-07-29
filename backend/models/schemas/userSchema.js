const User = require("../User");

const addUser = async (body) => {
  const user = await User.create(body);
  return user;
};

module.exports = {
  addUser,
};