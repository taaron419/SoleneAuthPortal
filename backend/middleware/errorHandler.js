function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, next) {
  const statusCode =
    error.statusCode || (error.name === "SequelizeValidationError" ? 400 : 500);
  const message =
    error.name === "SequelizeValidationError"
      ? error.errors.map((item) => item.message).join(", ")
      : error.message || "Internal server error";

  console.error(error);

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { notFound, errorHandler };
