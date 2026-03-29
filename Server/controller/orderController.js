const {
  createOrderService,
  updateOrderService,
  fetchUsersOrdersService,
} = require("../services/orderService");
const appError = require("../utils/appError");

const createOrder = async (req, res) => {
  console.log(req.body);
  
  const { totalPrice, payment_status, items, address } = req.body;
  const userId = req.userId;

  if (!totalPrice || !payment_status || !items || !address)
    throw appError("required details not found", 400);

  const response = await createOrderService(
    totalPrice,
    payment_status,
    items,
    address,
    userId,
  );

  res.status(200).json({ msg: "order successfully created", data: response });
};

const updateOrder = async (req, res) => {
  const { payment_status, address, orderId, totalPrice } = req.body;

  if (!payment_status || !orderId) throw appError("updating fields not found", 400);

  const response = await updateOrderService(
    payment_status,
    address,
    orderId,
    totalPrice,
  );

  res.status(200).json({ msg: "order successfully updated", data: response });
};

const fetchUsersOrders = async (req, res) => {
  const userId = req.userId;
  const response = await fetchUsersOrdersService(userId);

  res
    .status(200)
    .json({ msg: "user orders successfully fetched", data: response });
};
module.exports = { createOrder, updateOrder, fetchUsersOrders };
