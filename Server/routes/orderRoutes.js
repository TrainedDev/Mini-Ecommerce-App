const { Router } = require("express");
const {
  createOrder,
  updateOrder,
  fetchUsersOrders,
} = require("../controller/orderController");
const { asyncHandler } = require("../middleware/handler");
const authVerify = require("../middleware/authVerify");
// const { auth } = require("../middleware/authVerify")

const route = Router();

route.post("/create", authVerify, asyncHandler(createOrder));
route.patch("/update", authVerify, asyncHandler(updateOrder));
route.get("/all", authVerify, asyncHandler(fetchUsersOrders));

module.exports = { route };
