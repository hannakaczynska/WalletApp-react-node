const {
  addUser,
  logout
} = require("../models/schemas/userSchema");

const registerUser = async (req, res, next) => {
  try {
    const user = await addUser(req.body);
        if (!user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: { email: user.email, name: user.name, token: user.token, id: user._id, balance: user.balance },
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", err });
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await logout(req.body.id);
    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    res.status(204).json({
      status: "success",
      code: 204,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging out user", err });
    next(err);
  }
}

module.exports = {
  registerUser,
  logoutUser
};