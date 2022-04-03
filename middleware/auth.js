const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Api401Error } = require("../utils/Error");

const auth = async (req, res, next) => {
  try {
    if (req.token === undefined) {
      throw new Api401Error("Please authentication");
    }

    //extract to data
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "private123");
    //compare decoded data to db data
    const user = await User.findOne({
      where: { id_user: decoded.id_user },
    });

    next();
  } catch (err) {
    next(err);
  }
};
