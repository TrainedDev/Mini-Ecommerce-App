const express = require("express");
const cors = require("cors");
const { route: usersRoute } = require("./routes/usersRoute");
const { route: orderRoutes } = require("./routes/orderRoutes");
const { route: paymentRoutes } = require("./routes/paymentRoute");
const { globalErrorHandler } = require("./middleware/handler");
const { sequelize } = require("./models");
const { paymentQueue } = require("./queues");
const {config} = require("dotenv");

const app = express();

config();

const { CLIENT_URL } = process.env;

app.use(cors({
  // origin:"http://localhost:5173"
  origin: CLIENT_URL,
}));
app.use(express.json());

app.use("/auth", usersRoute);
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);
app.use(globalErrorHandler);

app.get("/check", async (req, res) => {
  const jobCounts = await paymentQueue.getJobCounts('waiting', 'completed', 'failed');
  const completedJobs = await paymentQueue.getCompleted();
  const waitingJobs = await paymentQueue.getWaiting();

  res.json({
    jobCounts,
    completedJobs,
    waitingJobs
  });
});

app.get("/", (req, res) => res.send("server is live"));
sequelize.authenticate().then(() => console.log("successfully connected to db")).catch(err => `failed to connect db: ${err}`)

module.exports = { app };
