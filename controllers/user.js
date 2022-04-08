const User = require("../models/user");
const { OK } = require("../utils/httpStatusCodes");
const logger = require("../utils/logger");
const { responseData } = require("../utils/successHandler");

const login = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findByCreditials(username, password);
    delete user.dataValues.password;

    user.dataValues.token = await user.generateToken(user.dataValues);
    responseData(res, OK, user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
