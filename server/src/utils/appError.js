class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    console.log(statusCode);
    this.status = `${statusCode}`.startsWith(4) ? false : "error";
  }
}
module.exports = AppError;
