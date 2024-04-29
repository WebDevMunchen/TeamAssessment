const User = require("../models/user-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = asyncWrapper(async (req, res, next) => {
  const { logInID, password } = req.body;

  const user = await User.create({
    logInID,
    password,
  });

  res.status(201).json(user);
});

const getProfile = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  } else {
    res.json(user);
  }
});

const login = asyncWrapper(async (req, res, next) => {
  const { logInID, password } = req.body;

  const user = await User.findOne({ logInID }).select("+password");

  if (!user) {
    throw new ErrorResponse("User does not exist!", 404);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorResponse("Incorrect Password!", 401);
  }

  const payload = {
    id: user._id,
    logInID: user.logInID,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "480m",
  });

  delete user.password;

  res
    .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
    .json(payload);
});

const logout = asyncWrapper(async (req, res, next) => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ success: true });
});

module.exports = {
  createUser,
  getProfile,
  login,
  logout,
};
