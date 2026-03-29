module.exports = (sq, datatypes) => {
  const Orders = sq.define(
    "mini_e_commerce_orders",
    {
      id: {
        type: datatypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      totalPrice: {
        type: datatypes.DECIMAL,
        allowNull: false,
      },
      address: {
        type: datatypes.STRING,
        allowNull: false,
      },
      payment_status: {
        type: datatypes.ENUM("pending", "canceled", "failed", "paid", "refund"),
        allowNull: false,
        defaultValue:"pending",
      },
      razorpay_order_id:{
        type:datatypes.STRING,
      },
      razorpay_payment_id:{
        type: datatypes.STRING,
      },
      razorpay_signature:{
        type: datatypes.STRING,
      }
    },
    {
      tableName: "mini_e_commerce_orders",
      timestamps: true,
    },
  );

  Orders.associate = (model) => {
    Orders.hasMany(model.mini_e_commerce_order_items, {
      foreignKey: "orderId",
      as: "items",
    });
    Orders.belongsTo(model.mini_e_commerce_users, { foreignKey: "userId" });
  };

  return Orders;
};
