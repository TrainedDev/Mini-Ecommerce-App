const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const globalErrorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ msg: err.message || "something went wrong" });
};

module.exports = { asyncHandler, globalErrorHandler };
