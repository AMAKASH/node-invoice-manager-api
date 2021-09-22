const { StatusCodes } = require("http-status-codes");
const CustoAPIError = require("./custom-api");

class NotFoundError extends CustoAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
