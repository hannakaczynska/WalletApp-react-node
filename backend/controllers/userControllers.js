const {
  addUser
} = require("../models/schemas/userSchema");

const registerUser = async (req, res, next) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", err });
    next(err);
  }
};

module.exports = {
  registerUser,
};