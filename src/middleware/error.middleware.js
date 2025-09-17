// src/middlewares/error.middleware.js

// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
	console.error("🔥 Error:", err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({
		success: false,
		message,
		// For debugging (optional in production)
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});
};

module.exports = errorHandler;
