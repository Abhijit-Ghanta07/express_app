class CustomError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status || 500;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500
        ? "failed to do this operation"
        : "ServerError Please try after some time";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 401;
    this.status = "Unauthorized";
  }
}
export class ServerError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 500;
    this.status = "ServerError Please try after some time";
    this.isOperational = false;
  }
}

export default CustomError;
