    const { Queue } = require("bullmq");
    const { redis: connection } = require("../config/redis");

    const paymentQueue = new Queue("payment_queue", { connection });
    const notificationQueue = new Queue("notification_queue", { connection });
    const deadLetter = new Queue("dead_letter", { connection });

    module.exports = { paymentQueue, notificationQueue, deadLetter };
