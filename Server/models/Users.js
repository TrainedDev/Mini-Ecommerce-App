module.exports = (sq, datatype) => {
  const Users = sq.define(
    "mini_e_commerce_users",
    {
      id: {
        type: datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      username: {
        type: datatype.STRING,
        allowNull: false,
      },
      email: {
        type: datatype.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: datatype.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "mini_e_commerce_users",
      timestamps: true,
    },
  );

  Users.associate = (model) => {
    Users.hasMany(model.mini_e_commerce_orders, { foreignKey: "userId" });
  };

  return Users;
};
