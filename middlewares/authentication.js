const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse.js");

const authenticate = (req, res, next) => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      throw new ErrorResponse("Forbidden!", 403);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
