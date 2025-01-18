const globalErrorHandler = (err, req, res, next) => {
  let { status, message } = err;

  // set default values if not provided
  if (!status) status = 500;
  if (!message) message = 'Internal Server Error';

  res.status(status);
  res.json({
    status: 'error',
    message: err.message,
    errorCode: err.code, // mongodb error codes: https://www.mongodb.com/docs/manual/reference/error-codes/
    stackTrace: process.env.ENV === 'production' ? null : err.stack,
  });
};

module.exports = globalErrorHandler;
