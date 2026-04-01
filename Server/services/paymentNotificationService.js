const { notificationQueue } = require("../queues");
const crypto = require("crypto");
const { config } = require("dotenv");
const appError = require("../utils/appError");
const { mini_e_commerce_orders: Orders } = require("../models");

config();

const { RAZORPAY_TEST_SECRET_KEY } = process.env;
const verifyPaymentService = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  userId
) => {
  const expectSignature = crypto
    .createHmac("sha256", RAZORPAY_TEST_SECRET_KEY)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectSignature !== razorpay_signature) {
    await Orders.update(
      { where: { razorpay_order_id } },
      { payment_status: "failed", razorpay_payment_id, razorpay_signature },
    );
    throw appError("payment verification failed, Invalid Signature!", 400);
  }

  const fetchOrder = await Orders.findOne({ where: { razorpay_order_id } });

  fetchOrder.status = "paid";
  fetchOrder.razorpay_payment_id = razorpay_payment_id;
  fetchOrder.razorpay_signature = razorpay_signature;

  await fetchOrder.save();

  await notificationQueue.add(
    "notify_user_payment",
    { userId },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: {
        age: 3600,
        count: 1000,
      },
      removeOnFail: false,
    },
  );
  return fetchOrder;
};

const notificationService = async (data) => {
  console.log("notification successfully sent", data);
};

module.exports = { verifyPaymentService, notificationService };
