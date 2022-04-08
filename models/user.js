const { Model, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sequelize = require("../config/database");
const { Api404Error } = require("../utils/Error");

class User extends Model {
  static async findByCreditials(username, password) {
    const user = await User.findOne({
      where: { username, password },
    });

    const hash = crypto.createHmac("sha256", password).digest("hex");
    console.log(hash);

    if (!user) {
      throw new Api404Error("username/password invalid");
    }

    return user;
  }

  generateToken(payload) {
    return jwt.sign(payload, "private123", {
      expiresIn: "1m", // expires in 1 minutes
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
