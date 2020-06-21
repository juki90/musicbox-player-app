require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.json({
      authError: "Authorization denied, no token.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.email = decoded.user.email;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      authError:
        "Authorization denied, you token may be expired. You are logged out",
    });
  }
};

module.exports = auth;
