const { Worker } = require("bullmq");
const {
  createPaymentService,
  notificationService,
} = require("../services/paymentNotificationService");
const { redis: connection } = require("../config/redis");

console.log("worker file is running ");

const paymentWorker = new Worker(
  "payment_queue",
  async (job) => {
    console.log("🚀 Payment worker started...");
   await createPaymentService(job.data);
  },
  { connection },
);

const notificationWorker = new Worker(
  "notification_queue",
  async (job) => {
    console.log("🚀 Notification worker started...");
    await notificationService(job.data);
  },
  { connection },
);

paymentWorker.on("completed", job => {
  console.log("payment success", job);
});

paymentWorker.on("active", job => console.log("job is active", job)
)

paymentWorker.on("failed", job => {
    console.log(job);
});

notificationWorker.on("failed", job => {
    console.log(job);
});

