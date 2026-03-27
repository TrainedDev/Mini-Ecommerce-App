const { mini_e_commerce_users: Users } = require("../models");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

config();

const { JWT_SECRET_KEY } = process.env;

const registerService = async (username, email, password) => {
  const checkUser = await Users.findOne({ where: { email } });

  if (checkUser) throw appError("Invalid credentials", 400);

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    username,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

const loginService = async (email, password) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) throw appError("Invalid credentials", 400);

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) throw appError("invalid credentials", 400);

  const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

const userProfileService = async (userId) => {
  const response = await Users.findByPk(userId);

  if(!response) throw appError("user not found", 400);

  return response;
}
module.exports = { registerService, loginService, userProfileService };
