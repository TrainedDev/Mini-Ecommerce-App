const Razorpay = require("razorpay");
const {config } = require("dotenv");

config();

const {RAZORPAY_TEST_KEY, RAZORPAY_TEST_SECRET_KEY} = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_TEST_KEY,
    key_secret: RAZORPAY_TEST_SECRET_KEY
});

module.exports = { razorpayInstance };

