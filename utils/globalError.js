import logger from "./logger.js";

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  logger.info("Global Error occured");
  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
};

export default globalErrorHandler;
