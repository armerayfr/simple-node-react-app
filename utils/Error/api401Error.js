const httpStatusCodes = require("../httpStatusCodes");
const BaseError = require("../baseError");

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NO_AUTH,
    description = "need auth",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = Api404Error;
