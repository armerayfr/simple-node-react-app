const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Api401Error } = require("../utils/Error");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");

    if (!bearerToken) {
      throw new Api401Error("Please authentication");
    }

    //extract to data
    const token = bearerToken.replace("Bearer ", "");
    const decoded = jwt.verify(token, "private123");

    //compare decoded data to db data
    const user = await User.findOne({
      where: { id_user: decoded.id_user },
    });

    req.user = user.dataValues;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
