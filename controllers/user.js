const User = require("../models/user");
const { OK } = require("../utils/httpStatusCodes");
const logger = require("../utils/logger");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByCreditials(username, password);

    // const token = await user.generateToken(user.data)
    res.status(OK).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
