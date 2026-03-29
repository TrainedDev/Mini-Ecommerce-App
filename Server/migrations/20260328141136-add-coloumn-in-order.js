'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  //  await queryInterface.removeColumn("mini_e_commerce_orders","status");

  //  await queryInterface.addColumn("mini_e_commerce_orders", "payment_status", {
  //   type: Sequelize.ENUM("pending", "canceled", "failed", "paid", "refund"),
  //   allowNull: false,
  //   defaultValue: "pending",
  //  });

   await queryInterface.addColumn("mini_e_commerce_orders", "razorpay_order_id", {
    type: Sequelize.STRING,
   })
   await queryInterface.addColumn("mini_e_commerce_orders", "razorpay_payment_id", {
    type: Sequelize.STRING,
   })
   await queryInterface.addColumn("mini_e_commerce_orders", "razorpay_signature", {
    type: Sequelize.STRING,
   })
  },
};
