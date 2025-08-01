const User = require("../User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

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

  const token = jwt.sign(
    { id: newUser._id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  newUser.token = token;

  const user = await newUser.save();
  return user;
};

const logout = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return false;
  }
  user.token = null;
  await user.save();
  return true;
};

module.exports = {
  addUser,
  logout,
};
