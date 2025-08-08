const {
  addUser,
  login,
  logout,
  refreshTokenSchema,
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
      data: {
        email: user.email,
        name: user.name,
        token: user.token,
        refreshToken: user.refreshToken,
        id: user._id,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", err });
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await login(req.body);
    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Invalid email or password",
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        email: user.email,
        name: user.name,
        token: user.token,
        refreshToken: user.refreshToken,
        id: user._id,
        balance: user.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in user", err });
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await logout(req.body);
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
};

const refreshTokenController = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const token = await refreshTokenSchema(refreshToken);
    if (!token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    console.log("New token generated:", token);
    res.status(200).json({ token: token.token });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutUser,
};
