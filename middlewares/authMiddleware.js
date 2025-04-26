const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized. No token provided.",
      status: "failed",
    });
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Forbidden. Invalid or expired token.",
        status: "failed",
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { auth };
