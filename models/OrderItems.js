module.exports = (sq, datatypes) => {
  const OrderItems = sq.define(
    "mini_e_commerce_order_items",
    {
      id: {
        type: datatypes.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: datatypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: datatypes.DECIMAL,
        allowNull: false,
      },
      quantity: {
        type: datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "mini_e_commerce_order_items",
      timestamps: true,
    },
  );

  OrderItems.associate = (model) => {
    OrderItems.belongsTo(model.mini_e_commerce_orders, {
      foreignKey: "orderId",
    });
  };

  return OrderItems;
};
