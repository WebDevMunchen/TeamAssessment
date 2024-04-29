const express = require("express");

const {
  createUser,
  login,
  logout,
  getProfile,
} = require("../controllers/user-controller.js");

const { authenticate } = require("../middlewares/authentication.js");

const userRouter = express.Router();

userRouter.route("/create").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/profile").get(authenticate, getProfile);

module.exports = userRouter;
