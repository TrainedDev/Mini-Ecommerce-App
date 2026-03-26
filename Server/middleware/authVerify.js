const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json("UnAuthorized");

    const decode = jwt.verify(token, JWT_SECRET_KEY);

    req.userId = decode.id;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "failed to authorize user", error: error.message });
  }
};
