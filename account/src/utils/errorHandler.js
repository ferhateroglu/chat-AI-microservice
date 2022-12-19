const { createLogger, transports, format } = require("winston");
const { AppError } = require("./appErrors");

const { combine, timestamp, prettyPrint, colorize, errors } = format;

const LogErrors = createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }), // <-- use errors format
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}
  async logError(err) {
    console.log("==================== Start Error Logger ===============");
    LogErrors.log({
      level: "error",
      message: err,
    });
    console.log("==================== End Error Logger ===============");
    // log error with Logger plugins

    return false;
  }

  isTrustError(error) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  process.on("uncaughtException", (reason, promise) => {
    console.log(reason, "UNHANDLED");
    throw reason; // need to take care
  });

  process.on("uncaughtException", (error) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
      //process exist // need restart
    }
  });

  // console.log(err.description, '-------> DESCRIPTION')
  // console.log(err.message, '-------> MESSAGE')
  // console.log(err.name, '-------> NAME')
  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({ message: errorDescription });
      }
      return res.status(err.statusCode).json({ message: err.message });
    } else {
      //process exit // terriablly wrong with flow need restart
    }
    return res.status(500).json({ message: "INITLIAL_SERVER_ERR" });
  }
  next();
};

module.exports = ErrorHandler;
