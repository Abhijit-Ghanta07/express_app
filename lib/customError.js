class CustomError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status || 408;
    this.status = msg || "request timeout";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 401;
    this.status = msg || "Unauthorized";
  }
}
export class ServerError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 500;
    this.status = msg || "Internal server Error";
    this.isOperational = false;
  }
}
export class appError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 400;
    this.status = msg || "bad request";
    this.isOperational = false;
  }
}

export default CustomError;
