const { StatusCodes } = require("http-status-codes");
const CustoAPIError = require("./custom-api");

class BadRequestError extends CustoAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
