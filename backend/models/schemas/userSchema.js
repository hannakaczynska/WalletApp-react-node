const User = require("../User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

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

  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  newUser.token = token;
  newUser.refreshToken = refreshToken;

  const user = await newUser.save();
  return user;
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    return false;
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "2m",
  });
  user.token = token;
  user.refreshToken = refreshToken;
  await user.save();
  return user;
};

const logout = async (id) => {
  const user = await User.findById({ _id: id });
  if (!user) {
    return false;
  }
  user.token = null;
  user.refreshToken = null;
  await user.save();
  return true;
};

const refreshTokenSchema = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    return false;
  }
  const newToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1m" });
  user.token = newToken;
  await user.save();
  return { token: newToken };
};

module.exports = {
  addUser,
  login,
  logout,
  refreshTokenSchema,
};
