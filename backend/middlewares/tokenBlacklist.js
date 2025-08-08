const BlacklistedToken = require("../models/BlacklistedToken");

const checkBlacklist = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const blacklisted = await BlacklistedToken.findOne({ token, type: "access" });
    if (blacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
  }
  next();
};

module.exports = checkBlacklist;
