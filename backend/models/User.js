const bcrypt = require("bcrypt");
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
type: (DataTypes.STRING(255),
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [2, 100] },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        set(value) {
          this.setDataValue("email", value.trim().toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING((hendred = 255)),
        allowNull: false,
        validate: { len: [8, 255] },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 12);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
          }
        },
      },
    },
  ));

module.exports = User;
