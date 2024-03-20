class CustomError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status || 500;
    this.status =
      this.statusCode >= 400 && this.statusCode >= 500 ? "failed" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
