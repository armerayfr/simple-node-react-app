const { Model, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

const sequelize = require("../config/database");
const { Api404Error } = require("../utils/Error");

class User extends Model {
  static async findByCreditials(username, password) {
    const user = await User.findOne({
      where: { username, password },
    });

    if (!user) {
      throw new Api404Error("username/password invalid");
    }

    return user;
  }

  generateToken(payload) {
    return jwt.sign(payload, "private123", {
      expiresIn: "12h",
    });
  }
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
