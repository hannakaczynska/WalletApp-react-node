const User = require("../User");

const addUser = async (body) => {
  const { email } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return false;
  }
  const user = await User.create(body);
  return user;
};

module.exports = {
  addUser,
};
