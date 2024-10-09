export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

// TODO: Make this better

// if (err.name === 'ValidationError') {
//   // Handle validation errors
//   res.status(400).json({
//     message: err.message,
//   });
// } else if (err.code === 11000) {
//   // Handle duplicate key errors
//   res.status(400).json({
//     message: "Duplicate key error: " + err.message,
//   });
