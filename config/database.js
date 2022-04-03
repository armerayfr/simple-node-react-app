const { Sequelize } = require("sequelize");

// create connection
const sequelize = new Sequelize("simple", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
