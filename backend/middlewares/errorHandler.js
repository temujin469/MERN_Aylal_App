const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 5000).json({
    success: false,
    message: err.message || "Дотоод серверийн алдаа",
  });
};

module.exports = errorHandler;
