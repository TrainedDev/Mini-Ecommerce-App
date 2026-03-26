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
      status: {
        type: datatypes.ENUM("canceled", "failed", "success"),
      },
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
