const { notificationQueue } = require("../queues");

const createPaymentService = async (orderId) => {
  console.log("payment success", orderId);
  await notificationQueue.add(
    "notify_user_payment",
    { orderId },
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
};

const notificationService = async (data) => {
  console.log("notification successfully sent", data);
};

module.exports = { createPaymentService, notificationService };
