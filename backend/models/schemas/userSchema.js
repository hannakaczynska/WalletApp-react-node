const User = require("../User");

const addUser = async (body) => {
  const { email, password, name } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return false;
  }
  const newUser = new User({
    email,
    name,
  });
  newUser.setPassword(password);
  const user = await newUser.save();
  return user;
};

module.exports = {
  addUser,
};
