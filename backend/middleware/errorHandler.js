// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: err.message || 'An unexpected error occurred' });
}

module.exports = errorHandler;
