const { loginService, registerService } = require("../services/userServices");
const appError = require("../utils/appError");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw appError("required details not found", 400);

  const response = await registerService(username, email, password);

  res.status(200).json({ msg: "user successfully registered", data: response });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw appError("required details not found", 400);

  const response = await loginService(email, password);

  res.status(200).json({ msg: "user successfully logged in", data: response });
};

module.exports = { register, login };
