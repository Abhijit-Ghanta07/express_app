import { errorLogger, httpLogger } from "./logger.js";

const globalErrorHandler = (err, req, res, next) => {
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
