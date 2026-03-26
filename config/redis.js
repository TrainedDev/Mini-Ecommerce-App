const ioRedis = require("ioredis");
const { config } = require("dotenv");

config();

const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;
const redis = new ioRedis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null, 
});

redis.on("error", (err) => console.log("Redis Client Error", err.message));
redis.on("connect", () => console.log("Redis connected successfully"));

module.exports = { redis };
