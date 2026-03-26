const appError = require("../utils/appError");

const createPayment = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) throw appError("required details not found", 400);

  const response = await createPaymentService(orderId);

  res.status(200).json({ msg: "payment successfully done", data: response });
};

module.exports = { createPayment }
