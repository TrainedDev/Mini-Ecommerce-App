const { verifyPaymentService } = require("../services/paymentNotificationService");
const appError = require("../utils/appError");

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.params;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    throw appError("required verification details not found", 400);

  const response = await verifyPaymentService(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  );

  res.status(200).json({ msg: "payment successfully done", data: response });
};

module.exports = { verifyPayment };
