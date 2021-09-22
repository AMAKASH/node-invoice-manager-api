const { StatusCodes } = require("http-status-codes");
const CustoAPIError = require("./custom-api");

class UnauthenticatedError extends CustoAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
