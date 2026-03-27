const {
  mini_e_commerce_orders: Orders,
  mini_e_commerce_users: Users,
  mini_e_commerce_order_items: OrderItems,
  sequelize,
} = require("../models");
const { paymentQueue } = require("../queues");
const appError = require("../utils/appError");
// console.log(appError);

const createOrderService = async (
  totalPrice,
  status,
  items,
  address,
  userId,
) => {
  const response = await sequelize.transaction(async (t) => {
    const newOrder = await Orders.create(
      { totalPrice, status, address, userId },
      { transaction: t },
    );

    if (!newOrder.id) throw appError("failed to create new order", 500);

    for (const ele of items) {
      const { productId, price, quantity } = ele;

      if (!productId || !price || !quantity)
        throw appError("required product details not found", 401);

      await OrderItems.create(
        { productId, price, quantity, orderId: newOrder.id },
        { transaction: t },
      );
    }
    return newOrder;
  });

  await paymentQueue.add(
    "process_user_payment",
    { orderId: response.id },
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

  return response;
};

const updateOrderService = async (status, address, orderId, totalPrice) => {
  const getOrder = await Orders.findByPk(orderId);

  if (!getOrder) throw appError("order not found", 401);

  if (address !== undefined) getOrder.address = address;
  if (totalPrice !== undefined) getOrder.totalPrice = totalPrice;

  getOrder.status = status;

  await getOrder.save();

  return getOrder;
};

const fetchUsersOrdersService = async (userId) => {
  const fetchOrders = await Users.findOne({
    where: { id: userId },
    include: [
      {
        model: Orders,
        include: [
          {
            model: OrderItems,
            as: "items",
          },
        ],
      },
    ],
  });

  return fetchOrders;
};
module.exports = {
  createOrderService,
  updateOrderService,
  fetchUsersOrdersService,
};
