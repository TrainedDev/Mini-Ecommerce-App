const { Router } = require("express");
const { asyncHandler } = require("../middleware/handler");
const { verifyPayment } = require("../controller/paymentNotificationController");
const authVerify = require("../middleware/authVerify");

const route = Router();

route.post("/verify", authVerify, asyncHandler(verifyPayment));

module.exports = route;
