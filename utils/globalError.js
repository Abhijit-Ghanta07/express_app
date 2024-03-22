import { errorLogger, httpLogger } from "./logger.js";

const prod = {};
const dev = {};

const globalErrorHandler = (err, req, res, next) => {
  // if (process.env.NODE_ENV == "PRODUCTION") {
  // } else if (process.env.NODE_ENV == "DEVELOPMENT") {
  // } else {
  // }
  if (err.statusCode == 404) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "server error";
    httpLogger.http({ ...err });
    return res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "server error";
  errorLogger.error({ ...err });
  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
};

export default globalErrorHandler;
