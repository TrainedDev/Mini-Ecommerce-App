const { Router } = require("express");
const {
  login,
  register,
  getUserProfile,
} = require("../controller/userController");
const { asyncHandler } = require("../middleware/handler");
const authVerify = require("../middleware/authVerify");

const route = Router();

route.post("/register", asyncHandler(register));
route.post("/login", asyncHandler(login));
route.post("/profile", authVerify, asyncHandler(getUserProfile));

module.exports = { route };
